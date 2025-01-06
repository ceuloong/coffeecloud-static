<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { invalidate } from '$app/navigation';
  import { userStore } from '$lib/stores/userStore';
  import { language, t } from '$lib/stores/i18nStore';

  const dispatch = createEventDispatcher();

  let realName = '';
  let idNumber = '';
  let idFrontFile: File | null = null;
  let idBackFile: File | null = null;
  let error = '';
  let loading = false;

  // 添加缩略图URL状态
  let idFrontPreview: string | null = null;
  let idBackPreview: string | null = null;

  // 在 script 标签顶部添加新的状态变量
  let idFrontPath: string | null = null;
  let idBackPath: string | null = null;

  // 添加证件类型
  let idType = 'idcard'; // 默认身份证
  $: idTypes = [
    { value: 'idcard', label: t('dashboard.verify.idTypes.idcard', $language) },
    { value: 'passport', label: t('dashboard.verify.idTypes.passport', $language) },
    { value: 'other', label: t('dashboard.verify.idTypes.other', $language) }
  ];

  // 修改生成文件路径的函数，返回一个包含路径和文件名的元组
  function generateFilePath(file: File, type: 'front' | 'back'): [string, string] {
    const ext = file.name.split('.').pop();
    const timestamp = Date.now();
    const userId = $userStore?.id;
    const filename = `${type}_${userId}_${timestamp}.${ext}`;
    const path = `/uploads/${userId}/verify`;
    return [path, filename];
  }

  // 修改文件选择处理函数
  async function handleFileSelect(event: Event, type: 'front' | 'back') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // 检查文件大小 (8MB = 8 * 1024 * 1024 bytes)
    const maxSize = 8 * 1024 * 1024;
    if (file.size > maxSize) {
      error = t('dashboard.verify.errors.fileTooLarge', $language);
      return;
    }

    // 添加文件类型验证
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      error = t('dashboard.verify.errors.invalidFileType', $language);
      return;
    }

    try {
      loading = true;

      // 生成本地预览
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'front') {
          idFrontPreview = e.target?.result as string;
        } else {
          idBackPreview = e.target?.result as string;
        }
      };
      reader.readAsDataURL(file);

      // 生成文件路径和文件名
      const [filePath, filename] = generateFilePath(file, type);

      // 准备上传数据
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder_path', filePath);
      formData.append('new_filename', filename);
      formData.append('token', import.meta.env.VITE_UPLOAD_TOKEN);

      // 调用上传服务
      const response = await fetch('/upload-api/upload', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Authorization': `${import.meta.env.VITE_UPLOAD_TOKEN}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '上传失败');
      }

      // 保存文件信息
      if (type === 'front') {
        idFrontFile = file;
        idFrontPath = filePath + '/' + filename;  // 添加这个变量来存储路径
      } else {
        idBackFile = file;
        idBackPath = filePath + '/' + filename;   // 添加这个变量来存储路径
      }
    } catch (err: any) {
      error = err.message;
      // 清除预览
      if (type === 'front') {
        idFrontPreview = null;
        idFrontPath = null;
      } else {
        idBackPreview = null;
        idBackPath = null;
      }
    } finally {
      loading = false;
    }
  }

  // 修改验证函数以支持不同证件类型
  function validateIdNumber(idNumber: string, type: string): boolean {
    switch (type) {
      case 'idcard':
        return /^[0-9]{17}[0-9xX]$/.test(idNumber);
      case 'passport':
        return /^[A-Z0-9]{6,12}$/.test(idNumber);
      case 'other':
        return idNumber.length >= 4;
      default:
        return false;
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    loading = true;

    try {
      // 先检查当前认证状态
      const statusResponse = await fetch('/api/user/verify/status');
      const statusData = await statusResponse.json();

      if (statusData.userStatus === 0) {
        error = t('dashboard.verify.notActivated', $language);
        loading = false;
        window.location.href = '/dashboard';
        return;
      }

      if (statusData.status === 'pending') {
        error = t('dashboard.verify.alreadySubmitted', $language);
        loading = false;
        return;
      }
      
      if (statusData.status === 'verified') {
        error = t('dashboard.verify.alreadyVerified', $language);
        loading = false;
        return;
      }

      // 验证表单数据
      if (!validateIdNumber(idNumber, idType)) {
        error = t(`dashboard.verify.errors.invalid${idType}`, $language);
        loading = false;
        return;
      }

      // 提交认证信息
      const formData = new FormData();
      formData.append('realName', realName);
      formData.append('idType', idType);
      formData.append('idNumber', idNumber);
      formData.append('idFrontPath', idFrontPath || '');
      formData.append('idBackPath', idBackPath || '');

      const response = await fetch('/api/user/verify', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // 提交成功后处理
      dispatch('success', data.message);
      // 先等待数据失效
      await invalidate('app:user');
      // 然后强制刷新页面
      window.location.reload();

    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  // 修改上传文本为响应式
  $: uploadLabels = {
    front: {
      title: t('dashboard.verify.upload.front', $language),
      alt: t('dashboard.verify.upload.frontAlt', $language)
    },
    back: {
      title: t('dashboard.verify.upload.back', $language),
      alt: t('dashboard.verify.upload.backAlt', $language)
    }
  };

  // 修改按钮文本为响应式
  $: buttonLabels = {
    cancel: t('common.cancel', $language),
    submit: t('common.submit', $language),
    submitting: t('common.loading', $language)
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#if error}
    <div class="error-message">{error}</div>
  {/if}

  <div class="form-group">
    <label for="real-name">{t('dashboard.account.realName', $language)}</label>
    <input
      type="text"
      id="real-name"
      bind:value={realName}
      required
      disabled={loading}
      placeholder={t('dashboard.verify.placeholders.realName', $language)}
    />
  </div>

  <div class="form-group">
    <label for="id-type">{t('dashboard.verify.idType', $language)}</label>
    <select
      id="id-type"
      bind:value={idType}
      disabled={loading}
      class="select-input"
    >
      {#each idTypes as type}
        <option value={type.value}>{type.label}</option>
      {/each}
    </select>
  </div>

  <div class="form-group">
    <label for="id-number">
      {t(`dashboard.verify.${idType}Number`, $language)}
    </label>
    <input
      type="text"
      id="id-number"
      bind:value={idNumber}
      required
      maxlength={idType === 'idcard' ? 18 : undefined}
      placeholder={t(`dashboard.verify.placeholders.${idType}`, $language)}
      disabled={loading}
    />
  </div>

  <div class="form-group">
    <label for="id-front">{t('dashboard.verify.uploadTitle', $language)}</label>
    <div class="upload-area">
      <div class="upload-box">
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          on:change={(e) => handleFileSelect(e, 'front')}
          required
          name="idFront"
          disabled={loading}
          id="id-front"
          class="file-input"
          capture="environment"
        />
        <label for="id-front" class="upload-label">
          {#if idFrontPreview}
            <img src={idFrontPreview} alt={uploadLabels.front.alt} class="preview-image" />
            <span class="file-name">{idFrontFile?.name}</span>
          {:else}
            <i class="fas fa-id-card upload-icon"></i>
            <span>{uploadLabels.front.title}</span>
          {/if}
        </label>
      </div>
      <div class="upload-box">
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          on:change={(e) => handleFileSelect(e, 'back')}
          required
          name="idBack"
          disabled={loading}
          style="display: none"
          id="id-back"
          class="file-input"
        />
        <label for="id-back" class="upload-label">
          {#if idBackPreview}
            <img src={idBackPreview} alt={uploadLabels.back.alt} class="preview-image" />
            <span class="file-name">{idBackFile?.name}</span>
          {:else}
            <i class="fas fa-id-card upload-icon"></i>
            <span>{uploadLabels.back.title}</span>
          {/if}
        </label>
      </div>
    </div>
  </div>

  <div class="modal-actions">
    <button type="button" class="btn-secondary" on:click={() => dispatch('cancel')} disabled={loading}>
      {buttonLabels.cancel}
    </button>
    <button type="submit" class="btn-primary" disabled={loading}>
      {loading ? buttonLabels.submitting : buttonLabels.submit}
    </button>
  </div>
</form>

<style>
  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  }

  .upload-area {
    display: flex;
    gap: 1rem;
  }

  .upload-box {
    flex: 1;
    border: 2px dashed #cbd5e0;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
  }

  .upload-box:hover {
    border-color: var(--primary-color);
    background-color: rgba(49, 130, 206, 0.05);
  }

  .upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding: 1rem;
    text-align: center;
    transition: all 0.2s;
    position: relative;
    z-index: 1;
  }

  .upload-label:hover {
    color: var(--primary-color);
  }

  .file-name {
    color: var(--primary-color);
    word-break: break-all;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }

  .error-message {
    color: #e53e3e;
    background-color: #fff5f5;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-primary {
    background-color: var(--primary-color);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--secondary-color);
  }

  .btn-primary:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }

  .btn-secondary {
    background-color: #e2e8f0;
    color: var(--text-color);
  }

  .btn-secondary:hover {
    background-color: #cbd5e0;
  }

  .btn-secondary:disabled {
    background-color: #edf2f7;
    color: #a0aec0;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    .upload-area {
      flex-direction: column;
    }

    .upload-box {
      width: 100%;
    }

    .modal-actions {
      flex-direction: column-reverse;
    }

    .btn-primary, .btn-secondary {
      width: 100%;
    }
  }

  .upload-icon {
    font-size: 2rem;
    color: #cbd5e0;
    margin-bottom: 0.5rem;
  }

  .preview-image {
    width: 100%;
    max-height: 150px;
    object-fit: contain;
    margin-bottom: 0.5rem;
    border-radius: 4px;
  }

  .select-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
  }

  .select-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  }

  .file-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    opacity: 0;
    pointer-events: none;
  }
</style> 