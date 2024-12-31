import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { UPLOAD_DIR } from '$env/static/private';

export async function saveFile(file: File, userId: number, type: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 创建用户专属的上传目录
  const userDir = join(UPLOAD_DIR, userId.toString(), 'verify');
  await mkdir(userDir, { recursive: true });

  // 生成文件名
  const ext = file.name.split('.').pop();
  const filename = `${type}_${Date.now()}.${ext}`;
  const filepath = join(userDir, filename);

  // 保存文件
  await writeFile(filepath, buffer);

  // 返回相对路径
  return `/uploads/${userId}/verify/${filename}`;
} 