export const translations = {
  zh: {
    common: {
      welcome: '欢迎回来',
      login: '登录',
      register: '注册',
      logout: '退出',
      dashboard: '个人中心',
      products: '算力产品',
      submit: '提交',
      cancel: '取消',
      loading: '加载中...',
      error: '错误',
      success: '成功'
    },
    auth: {
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      username: '用户名',
      loginSuccess: '登录成功',
      registerSuccess: '注册成功',
      passwordMismatch: '两次输入的密码不一致',
      emailExists: '邮箱已被使用',
      usernameExists: '用户名已被使用',
      emailPlaceholder: '请输入邮箱',
      passwordPlaceholder: '请输入密码',
      usernamePlaceholder: '请输入用户名',
      confirmPasswordPlaceholder: '请再次输入密码',
      noAccount: '还没有账号？',
      register: '注册账号',
      hasAccount: '已有账号？',
      login: '登录',
      loginFailed: '登录失败',
      registerFailed: '注册失败',
      approval: {
        status: {
          pending: '等待审核',
          approved: '已通过',
          rejected: '已拒绝',
          title: '账号审核状态',
          description: '您的账号正在审核中，审核通过后可进行实名认证',
          rejectReason: '拒绝原因',
          contactSupport: '如有疑问，请联系客服',
          waitingTime: '预计审核时间：1-2个工作日'
        },
        form: {
          title: '补充资料',
          company: '公司名称',
          position: '职位',
          phone: '联系电话',
          purpose: '使用目的',
          submit: '提交审核',
          success: '提交成功，请等待审核',
          required: '请填写此项'
        }
      }
    },
    dashboard: {
      overview: {
        totalPower: '总算力',
        totalIncome: '总收益',
        storage: '存储空间',
        onlineNodes: '在线节点',
        stable: '稳定',
        trend: {
          up: '上升',
          down: '下降',
          stable: '稳定'
        }
      },
      account: {
        title: '账户信息',
        realName: '真实姓名',
        idNumber: '身份证号',
        verifyStatus: '认证状态',
        changePassword: '修改密码',
        verify: '实名认证',
        registerTime: '注册时间',
        status: {
          inactive: '未激活',
          active: '已激活',
          disabled: '已禁用'
        }
      },
      verify: {
        status: {
          pending: '审核中',
          verified: '已认证',
          rejected: '未通过',
          none: '未认证'
        },
        upload: {
          front: '上传正面照片',
          back: '上传背面照片',
          frontAlt: '证件正面',
          backAlt: '证件背面'
        },
        alreadySubmitted: '您已提交认证申请，请耐心等待审核',
        alreadyVerified: '您已通过实名认证',
        rejectReason: '拒绝原因',
        waitingActivation: '您的账号正在等待管理员激活，激活后才能进行实名认证',
        idType: '证件类型',
        idTypes: {
          idcard: '身份证',
          passport: '护照',
          other: '其他证件'
        },
        idcardNumber: '身份证号',
        passportNumber: '护照号',
        otherNumber: '证件号',
        placeholders: {
          realName: '请输入真实姓名',
          idcard: '请输入18位身份证号',
          passport: '请输入护照号',
          other: '请输入证件号'
        },
        errors: {
          invalididcard: '请输入正确的身份证号码',
          invalidpassport: '请输入正确的护照号码',
          invalidother: '证件号码至少需要4位',
          invalidFileType: '只支持 JPG、JPEG 或 PNG 格式的图片',
          fileTooLarge: '文件大小不能超过 8MB'
        },
        uploadTitle: '证件照片'
      },
      menu: {
        console: '控制台',
        account: '账户信息',
        wallet: '我的钱包',
        earnings: '收益记录'
      },
      password: {
        title: '修改密码',
        current: '当前密码',
        new: '新密码',
        confirm: '确认新密码',
        success: '密码修改成功',
        error: '密码修改失败',
        placeholder: {
          current: '请输入当前密码',
          new: '请输入新密码',
          confirm: '请再次输入新密码'
        },
        rules: {
          required: '密码不能为空',
          length: '密码长度必须在6-20位之间',
          match: '两次输入的密码不一致'
        },
        submit: '确认修改',
        cancel: '取消'
      },
      analytics: {
        totalPower: '总算力',
        totalBalance: '总余额',
        availableBalance: '可用余额',
        totalPledge: '总质押',
        totalVestingFunds: '存储锁仓',
        totalPledgeReleased: '质押已释放',
        rewards24h: '24小时收益',
        rewards7d: '7天收益',
        rewards30d: '30天收益',
        nodeMetrics: '节点指标',
        sectors: '扇区统计',
        totalSectors: '总扇区数',
        effectiveSectors: '有效扇区',
        errorSectors: '错误扇区',
        minerID: '节点ID',
        power: '算力',
        efficiency: '挖矿效率',
        sectorHealth: '扇区健康度',
        status: '状态',
        online: '在线',
        offline: '离线',
        syncStatus: '同步状态'
      },
      earnings: {
        title: '收益记录',
        height: '区块高度',
        blockHeight: '区块高度',
        minerID: '节点ID',
        node: '节点',
        blockTime: '出块时间',
        reward: '奖励金额',
        rewardValue: '奖励金额',
        messageCount: '消息数量',
        msgCount: '消息数量',
        blockSize: '区块大小',
        status: '状态',
        noData: '暂无收益记录',
        statusNormal: '正常',
        statusOrphan: '孤块',
        statusMap: {
          0: '待确认',
          1: '已确认',
          2: '已失效'
        },
        chart: {
          title: '收益趋势',
          daily: '日收益',
          weekly: '周收益',
          monthly: '月收益',
          total: '总收益',
          timeRanges: {
            '24h': '24小时',
            '7d': '7天',
            '30d': '30天',
            '90d': '90天',
            '180d': '180天',
            '365d': '365天',
            all: '全部'
          },
          noData: '暂无数据',
          loading: '加载中...',
          unit: 'FIL',
          xAxis: '时间',
          yAxis: '收益(FIL)'
        }
      }
    },
    footer: {
      contactUs: '联系我们',
      followUs: '关注我们',
      email: '邮箱',
      phone: '电话',
      copyright: '版权所有'
    },
    login: {
      features: {
        title: '为什么选择 CoffeeCloud',
        power: {
          title: '高性能算力',
          desc: '提供专业的Filecoin挖矿算力，支持灵活扩展'
        },
        security: {
          title: '安全可靠',
          desc: '多重备份，7*24小时运维监控，确保设备稳定运行'
        },
        earnings: {
          title: '收益透明',
          desc: '实时查看挖矿收益，收益直接发放到您的钱包'
        }
      },
      rememberMe: '记住我',
      forgotPassword: '忘记密码？'
    },
    home: {
      hero: {
        subtitle: '专业的 Filecoin 云算力服务提供商',
        getStarted: '立即开始',
        learnMore: '了解更多'
      },
      stats: {
        nodes: '运营节点',
        storage: '存储容量',
        uptime: '运行稳定性',
        users: '用户信任'
      },
      features: {
        title: '我们的优势',
        hardware: {
          title: '专业硬件',
          desc: '采用企业级存储设备和服务器，确保稳定高效的挖矿性能'
        },
        security: {
          title: '安全可靠',
          desc: '多重备份机制，7*24小时运维监控，确保数据安全'
        },
        earnings: {
          title: '收益透明',
          desc: '实时查看挖矿收益，收益直接发放到您的钱包'
        },
        support: {
          title: '专业支持',
          desc: '专业技术团队提供全天候支持服务'
        }
      },
      whyUs: {
        title: '为什么选择我们',
        experience: {
          title: '丰富经验',
          desc: '多年Filecoin挖矿运营经验，深度参与生态建设'
        },
        technology: {
          title: '技术领先',
          desc: '自主研发的智能运维系统，优化挖矿效率'
        },
        service: {
          title: '优质服务',
          desc: '专业的客户服务团队，快速响应您的需求'
        }
      },
      cta: {
        title: '开启您的挖矿之旅',
        desc: '加入CoffeeCloud，享受专业的Filecoin云算力服务',
        button: '立即注册'
      }
    },
    products: {
      title: 'Filecoin 云算力产品',
      subtitle: '选择适合您的算力套餐，开启挖矿之旅',
      popularChoice: '最受欢迎',
      power: '算力',
      period: '合约期限',
      days: '天',
      purchase: '立即购买',
      basic: {
        name: '入门版',
        feature1: '1 PiB 存储空间',
        feature2: '540天合约期限',
        feature3: '标准技术支持',
        feature4: '基础运维服务'
      },
      pro: {
        name: '专业版',
        feature1: '5 PiB 存储空间',
        feature2: '540天合约期限',
        feature3: '优先技术支持',
        feature4: '高级运维服务',
        feature5: '收益优化建议'
      },
      enterprise: {
        name: '企业版',
        feature1: '10 PiB 存储空间（整节点）',
        feature2: '540天合约期限',
        feature3: '24/7专属支持',
        feature4: '企业级运维服务',
        feature5: '收益优化方案',
        feature6: '独立节点运维'
      },
      features: {
        title: '产品特色',
        security: {
          title: '安全可靠',
          desc: '多重备份机制，确保数据安全'
        },
        performance: {
          title: '高性能',
          desc: '采用企业级存储设备，单节点10PiB算力'
        },
        earnings: {
          title: '收益透明',
          desc: '实时查看挖矿收益，收益直接发放到您的钱包'
        },
        support: {
          title: '专业支持',
          desc: '专业运维团队7*24小时保障'
        }
      }
    }
  },
  en: {
    common: {
      welcome: 'Welcome back',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      products: 'Products',
      submit: 'Submit',
      cancel: 'Cancel',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    },
    auth: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      username: 'Username',
      loginSuccess: 'Login successful',
      registerSuccess: 'Registration successful',
      passwordMismatch: 'Passwords do not match',
      emailExists: 'Email already exists',
      usernameExists: 'Username already exists',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      usernamePlaceholder: 'Enter your username',
      confirmPasswordPlaceholder: 'Confirm your password',
      noAccount: 'Don\'t have an account?',
      register: 'Register an account',
      hasAccount: 'Already have an account?',
      login: 'Login',
      loginFailed: 'Login failed',
      registerFailed: 'Registration failed',
      approval: {
        status: {
          pending: 'Under Review',
          approved: 'Approved',
          rejected: 'Rejected',
          title: 'Account Review Status',
          description: 'Your account is under review. You can proceed with identity verification after approval.',
          rejectReason: 'Rejection Reason',
          contactSupport: 'Please contact support if you have any questions',
          waitingTime: 'Estimated review time: 1-2 business days'
        },
        form: {
          title: 'Additional Information',
          company: 'Company Name',
          position: 'Position',
          phone: 'Contact Number',
          purpose: 'Usage Purpose',
          submit: 'Submit for Review',
          success: 'Submitted successfully, please wait for review',
          required: 'This field is required'
        }
      }
    },
    dashboard: {
      overview: {
        totalPower: 'Total Power',
        totalIncome: 'Total Income',
        storage: 'Storage Space',
        onlineNodes: 'Online Nodes',
        stable: 'Stable',
        trend: {
          up: 'Rising',
          down: 'Falling',
          stable: 'Stable'
        }
      },
      account: {
        title: 'Account Information',
        realName: 'Real Name',
        idNumber: 'ID Number',
        verifyStatus: 'Verification Status',
        changePassword: 'Change Password',
        verify: 'Identity Verification',
        registerTime: 'Register Time',
        status: {
          inactive: 'Inactive',
          active: 'Active',
          disabled: 'Disabled'
        }
      },
      verify: {
        status: {
          pending: 'Pending',
          verified: 'Verified',
          rejected: 'Rejected',
          none: 'Not Verified'
        },
        upload: {
          front: 'Upload Front Photo',
          back: 'Upload Back Photo',
          frontAlt: 'ID Front Side',
          backAlt: 'ID Back Side'
        },
        alreadySubmitted: 'You have already submitted verification, please wait for review',
        alreadyVerified: 'You have already verified your identity',
        rejectReason: 'Rejection Reason',
        waitingActivation: 'Your account is waiting for admin activation. You can proceed with verification after activation.',
        idType: 'ID Type',
        idTypes: {
          idcard: 'ID Card',
          passport: 'Passport',
          other: 'Other'
        },
        idcardNumber: 'ID Card Number',
        passportNumber: 'Passport Number',
        otherNumber: 'Document Number',
        placeholders: {
          realName: 'Enter your real name',
          idcard: 'Enter 18-digit ID card number',
          passport: 'Enter passport number',
          other: 'Enter document number'
        },
        errors: {
          invalididcard: 'Please enter a valid ID card number',
          invalidpassport: 'Please enter a valid passport number',
          invalidother: 'Document number must be at least 4 characters',
          invalidFileType: 'Only JPG, JPEG or PNG images are supported',
          fileTooLarge: 'File size cannot exceed 8MB'
        },
        uploadTitle: 'ID Photos'
      },
      menu: {
        console: 'Console',
        account: 'Account',
        wallet: 'My Wallet',
        earnings: 'Earnings'
      },
      password: {
        title: 'Change Password',
        current: 'Current Password',
        new: 'New Password',
        confirm: 'Confirm Password',
        success: 'Password changed successfully',
        error: 'Failed to change password',
        placeholder: {
          current: 'Enter current password',
          new: 'Enter new password',
          confirm: 'Confirm new password'
        },
        rules: {
          required: 'Password is required',
          length: 'Password must be 6-20 characters',
          match: 'Passwords do not match'
        },
        submit: 'Submit',
        cancel: 'Cancel'
      },
      analytics: {
        totalPower: 'Total Power',
        totalBalance: 'Total Balance',
        availableBalance: 'Available Balance',
        totalPledge: 'Total Pledge',
        totalVestingFunds: 'Storage Vested',
        totalPledgeReleased: 'Pledge Released',
        rewards24h: '24h Rewards',
        rewards7d: '7d Rewards',
        rewards30d: '30d Rewards',
        nodeMetrics: 'Node Metrics',
        sectors: 'Sector Statistics',
        totalSectors: 'Total Sectors',
        effectiveSectors: 'Active Sectors',
        errorSectors: 'Error Sectors',
        minerID: 'Miner ID',
        power: 'Power',
        efficiency: 'Mining Efficiency',
        sectorHealth: 'Sector Health',
        status: 'Status',
        online: 'Online',
        offline: 'Offline',
        syncStatus: 'Sync Status'
      },
      earnings: {
        title: 'Earnings History',
        height: 'Block Height',
        blockHeight: 'Block Height',
        minerID: 'Node ID',
        node: 'Node',
        blockTime: 'Block Time',
        reward: 'Reward',
        rewardValue: 'Reward Amount',
        messageCount: 'Message Count',
        msgCount: 'Message Count',
        blockSize: 'Block Size',
        status: 'Status',
        noData: 'No earnings records',
        statusNormal: 'Normal',
        statusOrphan: 'Orphan',
        statusMap: {
          0: 'Pending',
          1: 'Confirmed',
          2: 'Invalid'
        },
        chart: {
          title: 'Earnings Trend',
          daily: 'Daily',
          weekly: 'Weekly',
          monthly: 'Monthly',
          total: 'Total',
          timeRanges: {
            '24h': '24h',
            '7d': '7d',
            '30d': '30d',
            '90d': '90d',
            '180d': '180d',
            '365d': '365d',
            all: 'All'
          },
          noData: 'No data available',
          loading: 'Loading...',
          unit: 'FIL',
          xAxis: 'Time',
          yAxis: 'Earnings(FIL)'
        }
      }
    },
    footer: {
      contactUs: 'Contact Us',
      followUs: 'Follow Us',
      email: 'Email',
      phone: 'Phone',
      copyright: 'All rights reserved'
    },
    login: {
      features: {
        title: 'Why Choose CoffeeCloud',
        power: {
          title: 'High Performance',
          desc: 'Professional Filecoin mining power with flexible scaling'
        },
        security: {
          title: 'Secure & Reliable',
          desc: 'Multiple backups with 24/7 operation monitoring'
        },
        earnings: {
          title: 'Transparent Earnings',
          desc: 'Real-time mining rewards directly to your wallet'
        }
      },
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot Password?'
    },
    home: {
      hero: {
        subtitle: 'Professional Filecoin Cloud Mining Service Provider',
        getStarted: 'Get Started',
        learnMore: 'Learn More'
      },
      stats: {
        nodes: 'Operating Nodes',
        storage: 'Storage Capacity',
        uptime: 'Uptime',
        users: 'Trusted Users'
      },
      features: {
        title: 'Our Advantages',
        hardware: {
          title: 'Professional Hardware',
          desc: 'Enterprise-grade storage and servers for stable mining performance'
        },
        security: {
          title: 'Secure & Reliable',
          desc: 'Multiple backups with 24/7 monitoring for data security'
        },
        earnings: {
          title: 'Transparent Earnings',
          desc: 'Real-time mining rewards sent directly to your wallet'
        },
        support: {
          title: 'Professional Support',
          desc: 'Technical team providing round-the-clock support'
        }
      },
      whyUs: {
        title: 'Why Choose Us',
        experience: {
          title: 'Rich Experience',
          desc: 'Years of Filecoin mining operation and ecosystem involvement'
        },
        technology: {
          title: 'Leading Technology',
          desc: 'Self-developed smart operation system optimizing mining efficiency'
        },
        service: {
          title: 'Quality Service',
          desc: 'Professional customer service team with rapid response'
        }
      },
      cta: {
        title: 'Start Your Mining Journey',
        desc: 'Join CoffeeCloud for professional Filecoin cloud mining services',
        button: 'Register Now'
      }
    },
    products: {
      title: 'Filecoin Cloud Mining Products',
      subtitle: 'Choose your mining package and start your journey',
      popularChoice: 'Most Popular',
      power: 'Power',
      period: 'Contract Period',
      days: 'days',
      purchase: 'Purchase Now',
      basic: {
        name: 'Basic',
        feature1: '1 PiB Storage Space',
        feature2: '540 Days Contract',
        feature3: 'Standard Support',
        feature4: 'Basic Maintenance'
      },
      pro: {
        name: 'Professional',
        feature1: '5 PiB Storage Space',
        feature2: '540 Days Contract',
        feature3: 'Priority Support',
        feature4: 'Advanced Maintenance',
        feature5: 'Earnings Optimization Tips'
      },
      enterprise: {
        name: 'Enterprise',
        feature1: '10 PiB Storage Space (Full Node)',
        feature2: '540 Days Contract',
        feature3: '24/7 Dedicated Support',
        feature4: 'Enterprise Maintenance',
        feature5: 'Earnings Optimization Plan',
        feature6: 'Independent Node Operation'
      },
      features: {
        title: 'Product Features',
        security: {
          title: 'Secure & Reliable',
          desc: 'Multiple backup mechanisms ensuring data security'
        },
        performance: {
          title: 'High Performance',
          desc: 'Enterprise storage equipment with 10PiB power per node'
        },
        earnings: {
          title: 'Transparent Earnings',
          desc: 'Real-time mining rewards sent directly to your wallet'
        },
        support: {
          title: 'Professional Support',
          desc: '24/7 professional maintenance team'
        }
      }
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      theme: 'Theme',
      notification: 'Notifications',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode'
    }
  }
}; 