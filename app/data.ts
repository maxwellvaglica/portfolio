type LeetCodeProblem = {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  description: string;
  example: string;
  approach: string;
  code: string;
};

type Project = {
  name: string;
  description: string;
  link: string;
  video?: string;
  image?: string;
  id: string;
  category?: string;
  github?: string;
  iterationImages?: { src: string; label: string; iterations: string }[];
  problems?: LeetCodeProblem[];
  details?: {
    overview: string;
    technologies: string[];
    features: string[];
    challenges?: string;
    results?: string;
  };
};

type WorkExperience = {
  company: string;
  title: string;
  start: string;
  end: string;
  link: string;
  id: string;
};

type BlogPost = {
  title: string;
  description: string;
  link: string;
  uid: string;
};

type SocialLink = {
  label: string;
  link: string;
};

export const PROJECTS: Project[] = [
  {
    name: "DeepLabCut: Rat Behavior Analysis",
    description:
      "Deep learning pipeline using DeepLabCut to track rat body parts and detect rearing behavior from video data, achieving high accuracy after 350,000+ training iterations.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1719650592946-55163c4994cb?w=800&h=600&fit=crop&q=80",
    id: "deeplabcut",
    category: "Deep Learning",
    iterationImages: [
      {
        src: "/rat_25000it.png",
        label: "25K Iterations",
        iterations: "25,000",
      },
      {
        src: "/rat_50000it.png",
        label: "50K Iterations",
        iterations: "50,000",
      },
      {
        src: "/rat_100000it.png",
        label: "100K Iterations",
        iterations: "100,000",
      },
      {
        src: "/rat_350000it.png",
        label: "350K Iterations",
        iterations: "350,000",
      },
    ],
    details: {
      overview:
        "A comprehensive deep learning pipeline for analyzing rat rearing behavior using DeepLabCut pose estimation. The project trains a ResNet-50 neural network to track five body parts (nosetip, ears, top back, tail base) and uses spatial relationships between these points to automatically detect rearing events. The model dramatically improves accuracy from 25,000 to 350,000 training iterations, demonstrating the importance of extensive training for pose estimation tasks.",
      technologies: [
        "Python",
        "DeepLabCut",
        "TensorFlow",
        "ResNet-50",
        "Computer Vision",
        "Pose Estimation",
        "Google Colab",
        "Pandas",
      ],
      features: [
        "Custom pose estimation model training with 350,000+ iterations",
        "Automated body part tracking (nosetip, ears, back, tail)",
        "Rearing behavior detection algorithm based on spatial relationships",
        "Interactive threshold calibration using staircase method",
        "Labeled video output with tracked body part overlays",
        "CSV export of frame-by-frame behavior classification",
      ],
      challenges:
        "Training deep neural networks for accurate pose estimation required extensive GPU compute time and careful hyperparameter tuning. Developing a robust rearing detection algorithm that works across different lighting conditions and camera angles was particularly challenging.",
      results:
        "Successfully trained a high-accuracy pose estimation model that dramatically improves from 25K to 350K iterations. The system can automatically detect rearing behavior in hours of video footage, replacing manual annotation that would take days.",
    },
  },
  {
    name: "LeetCode Problem Solutions",
    description:
      "Collection of algorithmic coding challenges solved in Python and C++, covering data structures, string manipulation, and SQL/Pandas data analysis across easy to hard difficulty levels.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop&q=80",
    id: "leetcode",
    category: "Algorithms",
    github: "https://github.com/maxwellvaglica/leetcode",
    problems: [
      {
        name: "Trips and Users",
        difficulty: "Hard",
        language: "Python (Pandas)",
        description:
          "Calculate the cancellation rate of taxi trips for unbanned users. Requires complex data manipulation with multiple table joins and aggregations.",
        example:
          "Input: trips table, users table → Output: Cancellation Rate per day",
        approach:
          "Merge trips with users table twice (for clients and drivers), filter out banned users, then calculate cancellation rates using groupby aggregations.",
        code: `import pandas as pd

def trips_and_users(trips: pd.DataFrame, users: pd.DataFrame) -> pd.DataFrame:
    mdf = pd.merge(trips, users[users['role']=='client'], 
                   left_on='client_id', right_on='users_id')
    mdf = pd.merge(mdf, users[users['role']=='driver'], 
                   left_on='driver_id', right_on='users_id')
    mdf = mdf[(mdf['client_banned']=='No') & (mdf['drivers_banned']=='No')]
    # Calculate cancellation rate by day
    totals = before.groupby('request_at').count() / after.groupby('request_at').count()
    return totals[['Day', 'Cancellation Rate']]`,
      },
      {
        name: "Validate IP Address",
        difficulty: "Medium",
        language: "Python",
        description:
          "Determine if a given string is a valid IPv4 address, IPv6 address, or neither. Must handle edge cases like leading zeros and invalid characters.",
        example:
          'Input: "172.16.254.1" → Output: "IPv4" | Input: "2001:0db8:85a3:0:0:8A2E:0370:7334" → Output: "IPv6"',
        approach:
          "Use regex patterns to validate IPv4 and IPv6 formats, with additional validation for IPv4 segment ranges (0-255).",
        code: `import re
class Solution:
    def validIPAddress(self, queryIP: str) -> str:
        return 'IPv6' if ':' in queryIP and re.match(
            r'^(([\\d]|[a-fA-F]){1,4}:){7}([\\d]|[a-fA-F]){1,4}$', queryIP
        ) else 'IPv4' if re.match(
            r'^((([1-9]\\d{0,2})|([0]))[.]){3}(([1-9]\\d{0,2})|([0]))$', queryIP
        ) and all(0 <= int(seg) <= 255 for seg in queryIP.split('.')) else 'Neither'`,
      },
      {
        name: "Find All Duplicates in Array",
        difficulty: "Medium",
        language: "C++",
        description:
          "Find all elements that appear twice in an array where all integers are in range [1, n]. Must run in O(n) time with constant extra space.",
        example: "Input: [4,3,2,7,8,2,3,1] → Output: [2,3]",
        approach:
          "Track seen elements and identify duplicates by checking if an element has been encountered before.",
        code: `class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> dups;
        vector<int> used;
        for (int i: nums) {
            if (std::find(used.begin(), used.end(), i) != used.end()) {
                dups.insert(dups.end(), i);
            } else {
                used.insert(used.begin(), i);
            }
        }
        return dups;
    }
};`,
      },
      {
        name: "Two Sum",
        difficulty: "Easy",
        language: "C++",
        description:
          "Find two numbers in an array that add up to a target value. Return their indices.",
        example: "Input: nums = [2,7,11,15], target = 9 → Output: [0,1]",
        approach:
          "Iterate through all pairs to find the combination that sums to target.",
        code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> out;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = 0; j < nums.size(); j++) {
                if (i != j && nums[i] + nums[j] == target) {
                    out.insert(out.end(), j);
                    out.insert(out.begin(), i);
                    return out;
                }
            }
        }
        return out;
    }
};`,
      },
      {
        name: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        language: "C++ & Python",
        description:
          "Remove duplicates in-place from a sorted array such that each element appears only once. Return the number of unique elements.",
        example:
          "Input: [0,0,1,1,1,2,2,3,3,4] → Output: 5, nums = [0,1,2,3,4,...]",
        approach:
          "Track unique elements seen so far and rebuild the array with only unique values.",
        code: `// C++ Solution
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        vector<int> used = {};
        int unique = 0;
        for (int i: nums) {
            bool is_used = false;
            for (int u: used) {
                if (i == u) { is_used = true; break; }
            }
            if (!is_used) {
                unique++;
                used.insert(used.end(), i);
            }
        }
        nums.clear();
        for (int i: used) nums.insert(nums.end(), i);
        return unique;
    }
};`,
      },
      {
        name: "Water Bottles",
        difficulty: "Easy",
        language: "Python",
        description:
          "Calculate maximum water bottles you can drink given initial bottles and exchange rate for empty bottles.",
        example:
          "Input: numBottles = 15, numExchange = 4 → Output: 19 (15 + 3 + 1)",
        approach:
          "Simulate drinking and exchanging bottles until no more exchanges are possible.",
        code: `class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        consumed = numBottles
        exchange = numBottles // numExchange
        consumed += exchange
        left_over = numBottles % numExchange + exchange
        while left_over >= numExchange:
            new_bottles = left_over // numExchange
            consumed += new_bottles
            left_over = left_over % numExchange + new_bottles
        return consumed`,
      },
    ],
    details: {
      overview:
        "A curated collection of LeetCode problem solutions demonstrating proficiency in algorithmic thinking, data structures, and multiple programming languages. Problems range from classic interview questions like Two Sum to complex SQL/Pandas challenges like Trips and Users. Each solution is optimized for readability and efficiency.",
      technologies: [
        "Python",
        "C++",
        "Pandas",
        "SQL",
        "Data Structures",
        "Algorithms",
        "Regular Expressions",
      ],
      features: [
        "Two Sum (Easy) - Classic array problem in C++",
        "Find All Duplicates in Array (Medium) - Space-efficient C++ solution",
        "Validate IP Address (Medium) - Regex-based Python validation",
        "Trips and Users (Hard) - Complex Pandas data manipulation",
        "Remove Duplicates from Sorted Array (Easy) - In-place C++ & Python",
        "Water Bottles (Easy) - Mathematical Python solution",
      ],
      challenges:
        "Balancing time and space complexity trade-offs, handling edge cases in input validation, and writing clean, maintainable code under time pressure. The Trips and Users problem required complex multi-table joins and aggregation logic.",
      results:
        "Successfully solved problems across all difficulty levels, demonstrating strong algorithmic foundations essential for technical interviews and real-world software engineering.",
    },
  },
  {
    name: "Sea Hero Quest: Clinical Data Analysis",
    description:
      "Large-scale data analysis of 4+ million players' spatial navigation patterns to identify cognitive biomarkers for dementia research, processing 78,000+ complete game sessions.",
    link: "#",
    image:
      "https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?w=800&h=600&fit=crop&q=80",
    id: "seaheroquest",
    category: "Data Science",
    details: {
      overview:
        "Analysis of raw gameplay data from Sea Hero Quest, a citizen science mobile game designed to collect spatial navigation data for dementia research. This project processes data from over 4 million players to identify patterns in navigation performance that could serve as early biomarkers for Alzheimer's disease. The analysis includes cross-level correlations, age-based performance analysis, and predictive modeling.",
      technologies: [
        "Python",
        "Pandas",
        "Dask",
        "NumPy",
        "SciPy",
        "Matplotlib",
        "Big Data Processing",
        "Statistical Analysis",
      ],
      features: [
        "Processing 78,000+ complete game sessions across 74 levels",
        "74×74 cross-correlation matrix for level performance analysis",
        "Z-score categorization and percentile ranking systems",
        "Quintile segmentation for player performance grouping",
        "Predictive modeling achieving ~60% accuracy on later level performance",
        "Age-based cognitive performance correlation analysis",
      ],
      challenges:
        "Processing millions of gameplay records required efficient big data techniques using Dask for parallel processing. Identifying meaningful patterns in noisy gameplay data while controlling for confounding variables like game difficulty and player demographics was a significant analytical challenge.",
      results:
        "Discovered that levels 43, 52, 53, 58 & 71 show the strongest correlation with overall cognitive performance, all sharing 'hard' difficulty and 'checkpoint' level types. Interestingly, age was NOT a significant predictor of performance, challenging common assumptions about cognitive decline.",
    },
  },
  {
    name: "Cryptography: RSA & Vigenere Cipher",
    description:
      "Full implementation of RSA encryption/decryption with cryptographic attacks including weak key detection, broadcast attacks using Chinese Remainder Theorem, and parity oracle exploits.",
    link: "#",
    image:
      "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=800&h=600&fit=crop&q=80",
    id: "cryptography",
    category: "Security",
    details: {
      overview:
        "A comprehensive cryptography project implementing RSA and Vigenere cipher algorithms with various cryptographic attacks. The project demonstrates deep understanding of public-key cryptography, including key generation, encryption/decryption, and multiple attack vectors using advanced mathematical techniques like the Chinese Remainder Theorem and modular arithmetic.",
      technologies: [
        "Python",
        "Cryptography",
        "Number Theory",
        "Decimal Arithmetic",
        "Hash Functions (SHA-256)",
        "Modular Arithmetic",
      ],
      features: [
        "RSA key generation with large prime numbers",
        "RSA encryption and decryption implementation",
        "Vigenere cipher with dictionary-based cryptanalysis",
        "Weak RSA key detection using GCD analysis",
        "RSA broadcast attack using Chinese Remainder Theorem",
        "Parity oracle attack for plaintext recovery",
      ],
      challenges:
        "Handling arbitrary-precision arithmetic for 2048+ bit RSA operations, implementing mathematically complex attacks on cryptographic systems, and managing precision issues with Python's Decimal module for extremely large numbers.",
      results:
        "Successfully implemented multiple cryptographic algorithms and attacks, demonstrating mastery of both classical and modern cryptography principles. Achieved 100% score on the project.",
    },
  },
  {
    name: "BGP Hijacking Simulation",
    description:
      "Network security simulation demonstrating BGP route hijacking attacks in Mininet, implementing multi-router topologies with Quagga/Zebra and real-time attack visualization.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80",
    id: "bgp-hijacking",
    category: "Networking",
    details: {
      overview:
        "A comprehensive network security project that simulates BGP hijacking attacks in a controlled Mininet environment. The project implements a multi-router network topology with full BGP routing, demonstrates how rogue autonomous systems can hijack internet routes, and provides real-time visualization of attack propagation.",
      technologies: [
        "Python",
        "Mininet",
        "BGP Protocol",
        "Quagga/Zebra",
        "Network Simulation",
        "Linux Networking",
      ],
      features: [
        "Multi-router network topology with 6+ routers",
        "Full BGP routing protocol implementation",
        "Rogue AS injection and route hijacking",
        "Real-time route propagation visualization",
        "Web-based attack monitoring interface",
        "Configurable attack scenarios (easy/hard mode)",
      ],
      challenges:
        "Configuring complex BGP routing tables across multiple routers, managing Linux network namespaces in Mininet, simulating realistic attack scenarios, and ensuring proper route convergence after attacks.",
      results:
        "Successfully demonstrated BGP hijacking vulnerabilities and created an educational tool for understanding critical internet infrastructure security. Achieved 150% score (bonus points) on the project.",
    },
  },
  {
    name: "Trading Strategy Evaluation",
    description:
      "ML-based trading system using ensemble methods (BagLearner with Random Trees) to predict stock movements, with full backtesting simulation including transaction costs.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop&q=80",
    id: "strategy-evaluation",
    category: "Machine Learning",
    details: {
      overview:
        "A comprehensive machine learning project for developing and evaluating automated trading strategies. The project implements ensemble learning using bagging with random decision trees, calculates technical indicators, and simulates market conditions with realistic transaction costs to develop profitable trading strategies.",
      technologies: [
        "Python",
        "Machine Learning",
        "Ensemble Methods (Bagging)",
        "Random Trees",
        "Pandas",
        "NumPy",
        "Technical Analysis",
      ],
      features: [
        "BagLearner ensemble implementation from scratch",
        "RTLearner (Random Tree) for trading signals",
        "Technical indicators (SMA, Bollinger Bands, RSI, MACD)",
        "Market simulation with transaction costs and slippage",
        "Strategy backtesting with walk-forward analysis",
        "Performance metrics (Sharpe ratio, cumulative returns, max drawdown)",
      ],
      challenges:
        "Designing effective feature engineering pipelines for financial data, implementing ensemble learning methods without external ML libraries, handling look-ahead bias in backtesting, and optimizing strategy parameters for out-of-sample performance.",
      results:
        "Developed trading strategies that significantly outperform buy-and-hold benchmarks, demonstrating proficiency in machine learning for quantitative finance.",
    },
  },
  {
    name: "BGP Measurements & Analysis",
    description:
      "Large-scale network analysis processing BGP routing data to track internet routing dynamics, autonomous system growth, and prefix advertisement patterns using pybgpstream.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",
    id: "bgp-measurements",
    category: "Networking",
    details: {
      overview:
        "A data engineering project that processes massive BGP (Border Gateway Protocol) routing datasets to analyze internet routing behavior. The project tracks unique advertised prefixes, monitors autonomous system growth, and identifies the top ASes by prefix growth over time using real BGP data from global route collectors.",
      technologies: [
        "Python",
        "pybgpstream",
        "Data Processing",
        "BGP Protocol",
        "Network Analysis",
        "Time Series Analysis",
      ],
      features: [
        "Processing of multi-gigabyte BGP routing tables",
        "Unique prefix tracking across time snapshots",
        "Autonomous system identification and counting",
        "Top 10 ASes by prefix growth analysis",
        "AS path parsing and relationship analysis",
        "Temporal trend analysis of routing changes",
      ],
      challenges:
        "Processing massive BGP routing datasets efficiently, parsing complex AS path structures with AS-SETs, handling data from multiple global vantage points, and correlating routing changes across time.",
      results:
        "Successfully analyzed global BGP routing data to identify routing trends and AS behavior patterns, providing insights into internet routing dynamics at scale.",
    },
  },
  {
    name: "SDN Firewall Implementation",
    description:
      "Software-Defined Networking firewall using POX controller and OpenFlow protocol for dynamic packet filtering with programmable security policies.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
    id: "sdn-firewall",
    category: "Networking",
    details: {
      overview:
        "A Software-Defined Networking (SDN) project implementing a programmable firewall using the POX controller and OpenFlow protocol. The firewall dynamically enforces network security policies based on MAC addresses, IP addresses, ports, and protocols, providing centralized and flexible network security management.",
      technologies: [
        "Python",
        "POX Controller",
        "OpenFlow 1.0",
        "SDN Architecture",
        "Network Security",
        "Packet Filtering",
      ],
      features: [
        "Dynamic firewall rule processing engine",
        "Layer 2 MAC address filtering",
        "Layer 3 IP-based access control",
        "Layer 4 port and protocol filtering (TCP/UDP)",
        "OpenFlow flow table management",
        "Priority-based rule matching",
      ],
      challenges:
        "Understanding OpenFlow protocol specifications and match fields, implementing efficient packet matching logic, managing flow table entries with proper priorities, and enforcing complex security policies without impacting network performance.",
      results:
        "Successfully implemented a functional SDN firewall demonstrating the power of programmable networks for security enforcement.",
    },
  },
  {
    name: "Machine Learning for Cyber Security",
    description:
      "End-to-end ML pipeline for security threat detection including data preprocessing, feature engineering, model training, and evaluation on real-world security datasets.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80",
    id: "ml-cybersecurity",
    category: "Machine Learning",
    details: {
      overview:
        "A comprehensive machine learning project applying data science and ML techniques to cybersecurity problems. The project includes building complete ML pipelines with data preprocessing, feature engineering, model development, hyperparameter tuning, and evaluation for security threat detection and classification.",
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Machine Learning",
        "Data Preprocessing",
      ],
      features: [
        "Automated data type detection and conversion",
        "Feature engineering for network traffic data",
        "Handling imbalanced security datasets",
        "Multiple ML model comparison",
        "Cross-validation and hyperparameter tuning",
        "Security threat classification pipeline",
      ],
      challenges:
        "Handling highly imbalanced security datasets where attacks are rare, preprocessing noisy network traffic data, developing effective features for threat detection, and building interpretable models for security operations.",
      results:
        "Successfully developed machine learning pipelines for cybersecurity applications, demonstrating proficiency in applied ML. Achieved 100% score on the project.",
    },
  },
  {
    name: "API Security & Penetration Testing",
    description:
      "Hands-on security assessment identifying and exploiting API vulnerabilities including authentication bypasses, injection flaws, and authorization issues.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80",
    id: "api-security",
    category: "Security",
    details: {
      overview:
        "A hands-on security project focused on identifying and exploiting vulnerabilities in web APIs. The project covers the OWASP API Security Top 10, including broken authentication, excessive data exposure, and injection attacks, with practical exploitation techniques and secure coding recommendations.",
      technologies: [
        "Python",
        "REST API Security",
        "OWASP Top 10",
        "Penetration Testing",
        "HTTP/HTTPS",
        "Burp Suite",
      ],
      features: [
        "API endpoint discovery and enumeration",
        "Authentication mechanism analysis and bypass",
        "JWT token manipulation attacks",
        "SQL injection in API parameters",
        "Authorization bypass testing",
        "Security vulnerability documentation",
      ],
      challenges:
        "Understanding complex authentication mechanisms like OAuth and JWT, identifying subtle logic flaws in authorization, and developing reliable exploits that work across different API implementations.",
      results:
        "Successfully identified and exploited multiple security vulnerabilities, capturing all security flags. Achieved 100% score demonstrating comprehensive API security knowledge.",
    },
  },
  {
    name: "Web Security Assessment",
    description:
      "Comprehensive web application penetration testing covering SQL injection, XSS, CSRF, and authentication bypass with detailed vulnerability analysis.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80",
    id: "web-security",
    category: "Security",
    details: {
      overview:
        "A detailed web security assessment project exploring the OWASP Top 10 vulnerabilities in web applications. The project involves identifying injection flaws, broken authentication, XSS, and other critical vulnerabilities, developing exploits, and documenting remediation strategies.",
      technologies: [
        "Web Security",
        "OWASP Top 10",
        "SQL Injection",
        "XSS/CSRF",
        "Browser DevTools",
        "Security Analysis",
      ],
      features: [
        "SQL injection (blind, union-based, error-based)",
        "Cross-site scripting (reflected, stored, DOM-based)",
        "Cross-site request forgery exploitation",
        "Authentication and session bypass",
        "Insecure direct object references",
        "Security misconfiguration exploitation",
      ],
      challenges:
        "Identifying subtle security vulnerabilities in modern web applications, understanding WAF bypass techniques, chaining multiple vulnerabilities for greater impact, and developing reliable exploits.",
      results:
        "Successfully identified and exploited multiple web application vulnerabilities, capturing all security flags. Achieved 100% score with comprehensive security documentation.",
    },
  },
  {
    name: "Q-Learner: Reinforcement Learning Trading",
    description:
      "Reinforcement learning implementation using Q-learning and Dyna-Q for automated trading strategy development with experience replay and model-based planning.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=80",
    id: "qlearner",
    category: "Machine Learning",
    details: {
      overview:
        "A reinforcement learning project implementing Q-Learning for automated trading strategies. The project includes tabular Q-learning with epsilon-greedy exploration, Dyna-Q for model-based learning with experience replay, and application to real stock market data for trading decisions.",
      technologies: [
        "Python",
        "Reinforcement Learning",
        "Q-Learning",
        "Dyna-Q",
        "NumPy",
        "Pandas",
      ],
      features: [
        "Tabular Q-Learning implementation",
        "Epsilon-greedy exploration with decay",
        "Dyna-Q model-based planning",
        "Experience replay for sample efficiency",
        "State discretization for continuous data",
        "Trading action optimization (buy/sell/hold)",
      ],
      challenges:
        "Designing appropriate state representations for financial data, tuning exploration-exploitation tradeoff, implementing efficient Q-table updates, and handling the non-stationarity of financial markets.",
      results:
        "Successfully implemented a Q-Learner that develops profitable trading strategies through reinforcement learning, demonstrating understanding of RL principles in financial applications.",
    },
  },
  {
    name: "Technical Indicator Evaluation",
    description:
      "Quantitative finance project implementing technical indicators (SMA, Bollinger Bands, RSI, MACD) and developing theoretically optimal trading strategies.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop&q=80",
    id: "indicator-evaluation",
    category: "Machine Learning",
    details: {
      overview:
        "A quantitative finance project focused on implementing and evaluating technical indicators for trading. The project creates a Theoretically Optimal Strategy using perfect future knowledge as an upper bound, implements various technical indicators, and compares indicator-based strategies against benchmarks.",
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Technical Analysis",
        "Matplotlib",
        "Backtesting",
      ],
      features: [
        "Technical indicators (SMA, EMA, RSI, Bollinger Bands, MACD)",
        "Theoretically Optimal Strategy implementation",
        "Market simulation with transaction costs",
        "Performance metrics (Sharpe, Sortino, max drawdown)",
        "Benchmark comparison analysis",
        "Trading signal visualization",
      ],
      challenges:
        "Implementing numerically stable indicator calculations, avoiding look-ahead bias, properly accounting for transaction costs, and evaluating strategy performance with appropriate risk-adjusted metrics.",
      results:
        "Successfully developed and backtested trading strategies using technical indicators, demonstrating strong understanding of quantitative finance principles.",
    },
  },
  {
    name: "Power System Neural Network",
    description:
      "Deep learning model using PyTorch to predict branch overloads in electric power grids, implementing neural networks for critical infrastructure monitoring.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&q=80",
    id: "power-system-nn",
    category: "Machine Learning",
    details: {
      overview:
        "A deep learning project using neural networks to predict branch overloads in electric power systems. The project implements a multi-layer neural network in PyTorch to analyze power flow data and predict potential grid failures, critical for maintaining power grid stability and preventing cascading blackouts.",
      technologies: [
        "Python",
        "PyTorch",
        "Deep Learning",
        "Neural Networks",
        "Power Systems",
        "Scikit-learn",
      ],
      features: [
        "Custom neural network architecture design",
        "Multi-layer fully connected network with ReLU activation",
        "Feature scaling and normalization pipeline",
        "Binary classification for overload prediction",
        "Model training with validation monitoring",
        "Performance evaluation (accuracy, precision, recall)",
      ],
      challenges:
        "Designing network architecture for power system data characteristics, handling class imbalance in overload events, selecting optimal hyperparameters, and ensuring model generalizes across different grid configurations.",
      results:
        "Successfully developed a neural network model for power system monitoring, demonstrating application of deep learning to critical infrastructure problems.",
    },
  },
  {
    name: "PLC Programming & Industrial Automation",
    description:
      "Industrial control system programming using IEC 61131-3 Structured Text for automated positioning systems with real-time control logic.",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
    id: "plc-programming",
    category: "Systems",
    details: {
      overview:
        "An industrial automation project implementing PLC (Programmable Logic Controller) programming using Structured Text (ST) following IEC 61131-3 standards. The project implements control logic for precision positioning systems, including coordinate-based movement control and automated sequences.",
      technologies: [
        "Structured Text (ST)",
        "IEC 61131-3",
        "PLC Programming",
        "Industrial Automation",
        "Control Systems",
      ],
      features: [
        "Precision position control logic",
        "Coordinate system implementation (X/Y axes)",
        "Target tracking algorithms",
        "Directional motor control",
        "Binary I/O handling and debouncing",
        "State machine implementation",
      ],
      challenges:
        "Understanding real-time PLC programming paradigms, implementing efficient control logic within scan cycle constraints, handling binary I/O operations reliably, and ensuring deterministic behavior in industrial environments.",
      results:
        "Successfully implemented PLC control systems for automated positioning, demonstrating understanding of industrial automation and control systems engineering.",
    },
  },
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: "Tempus Labs",
    title: "Computational Biologist",
    start: "2021",
    end: "Present",
    link: "https://www.tempus.com/",
    id: "work1",
  },
  {
    company: "Indiana University",
    title: "Research Programmer",
    start: "2019",
    end: "2021",
    link: "https://www.indiana.edu/",
    id: "work2",
  },
];

export const BLOG_POSTS: BlogPost[] = [];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/max-vaglica",
  },
  {
    label: "GitHub",
    link: "https://github.com/maxwellvaglica",
  },
];

export const EMAIL = "maxvaglica@gmail.com";
