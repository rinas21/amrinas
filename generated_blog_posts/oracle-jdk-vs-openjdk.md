---
title: Oracle JDK vs OpenJDK
---

# Oracle JDK vs OpenJDK

## Introduction
Java Development Kit (JDK) is essential for developing and running Java applications. There are two main distributions:
1. **Oracle JDK** - Provided by Oracle, with commercial and open-source versions.
2. **OpenJDK** - Open-source implementation of the Java Platform, Standard Edition.

## Key Differences
| Feature         | Oracle JDK | OpenJDK |
|----------------|-----------|---------|
| **License** | Requires a commercial license for production use (from Java 11 onwards) | Open-source under GPL v2 with Classpath Exception |
| **Support** | Long-term support (LTS) versions with extended updates | Community-driven support with LTS from vendors |
| **Performance** | Often optimized with proprietary improvements | Similar performance but depends on vendor builds |
| **Updates & Patches** | Security updates for LTS versions require a subscription | Security updates provided by the community and vendors |
| **Builds** | Official Oracle builds | Built by various vendors like Red Hat, AdoptOpenJDK, Amazon Corretto |

## Which One to Choose?
- **Choose Oracle JDK** if you need Oracle’s commercial support, long-term updates, and performance optimizations.
- **Choose OpenJDK** if you prefer an open-source, free-to-use option with community support.

## Installing OpenJDK
### On Ubuntu/Debian
```sh
sudo apt update && sudo apt install openjdk-11-jdk
```
### On CentOS/RHEL
```sh
sudo yum install java-11-openjdk-devel
```

## Installing Oracle JDK
1. Download from [Oracle’s official website](https://www.oracle.com/java/technologies/javase-downloads.html).
2. Follow the installation steps based on your OS.

## Checking Installed JDK Version
```sh
java -version
```

## Conclusion
Both Oracle JDK and OpenJDK are viable choices. The decision depends on licensing, support needs, and vendor preferences. OpenJDK is generally recommended for open-source and enterprise projects looking for free alternatives.

