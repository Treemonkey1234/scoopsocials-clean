#!/bin/bash

# 🔑 ScoopSocials Deploy Key Setup Script
# This script generates SSH keys and provides setup instructions

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 ScoopSocials Deploy Key Setup${NC}"
echo "================================="

# Check if SSH directory exists
if [ ! -d "$HOME/.ssh" ]; then
    echo -e "${YELLOW}Creating ~/.ssh directory...${NC}"
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"
fi

# Generate timestamp for unique key name
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
KEY_NAME="scoopsocials_deploy_${TIMESTAMP}"
KEY_PATH="$HOME/.ssh/${KEY_NAME}"

echo -e "${YELLOW}Generating SSH key pair...${NC}"
ssh-keygen -t ed25519 -C "scoopsocials-deploy-${TIMESTAMP}" -f "${KEY_PATH}" -N ""

# Set proper permissions
chmod 600 "${KEY_PATH}"
chmod 644 "${KEY_PATH}.pub"

echo -e "${GREEN}✅ SSH key pair generated successfully!${NC}"
echo ""

# Display public key
echo -e "${BLUE}📋 Your PUBLIC key (add this to GitHub):${NC}"
echo "================================================"
cat "${KEY_PATH}.pub"
echo "================================================"

# Update SSH config
SSH_CONFIG="$HOME/.ssh/config"
echo -e "${YELLOW}Updating SSH config...${NC}"

cat >> "$SSH_CONFIG" << EOF

# ScoopSocials Deploy Key - Generated $(date)
Host github-scoopsocials
    HostName github.com
    User git
    IdentityFile ${KEY_PATH}
    IdentitiesOnly yes
EOF

echo -e "${GREEN}✅ SSH config updated!${NC}"

# Instructions
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "=============="
echo "1. Copy the PUBLIC key above"
echo "2. Go to your GitHub repository"
echo "3. Settings → Deploy keys → Add deploy key"
echo "4. Title: 'ScoopSocials Deploy Key ${TIMESTAMP}'"
echo "5. Paste the public key"
echo "6. ✅ Check 'Allow write access'"
echo "7. Click 'Add key'"
echo ""

echo -e "${BLUE}🧪 Test the connection:${NC}"
echo "ssh -T github-scoopsocials"
echo ""

echo -e "${BLUE}🚀 Deploy with:${NC}"
echo "git remote add deploy github-scoopsocials:yourusername/scoopsocials-clean.git"
echo "git push deploy main"
echo ""

echo -e "${GREEN}🎉 Deploy key setup complete!${NC}"

# Offer to test connection
echo -e "${YELLOW}Would you like to test the SSH connection now? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Testing SSH connection...${NC}"
    if ssh -T github-scoopsocials; then
        echo -e "${GREEN}✅ SSH connection successful!${NC}"
    else
        echo -e "${RED}❌ SSH connection failed. Make sure you've added the public key to GitHub.${NC}"
    fi
fi

echo ""
echo -e "${BLUE}📄 Key files location:${NC}"
echo "Private key: ${KEY_PATH}"
echo "Public key:  ${KEY_PATH}.pub"
echo ""
echo -e "${RED}⚠️  Keep your private key secure and never share it!${NC}" 