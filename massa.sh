

wget -O massa_MAIN.2.1 https://github.com/massalabs/massa/releases/download/MAIN.2.1/massa_MAIN.2.1_release_linux.tar.gz
tar xvzf massa_MAIN.2.1
wait
rm massa_MAIN.2.1
cd massa/massa-node


read -s -p "Enter the password for massa-node (PASSWORD): " password
echo ""

if [ -z "$password" ]; then
    echo "Password is empty. Cancelling service creation."
    exit
fi

sudo tee /etc/systemd/system/massad.service > /dev/null <<EOF
[Unit]
Description=Massa Node Service
After=network.target

[Service]
Type=simple
WorkingDirectory=$(pwd)
ExecStart=$(pwd)/massa-node -p \$MASSA_PASSWORD
Restart=always
RestartSec=3
User=$(whoami)
Group=$(id -gn)
Environment=PATH=$(echo \$PATH)
Environment=MASSA_PASSWORD=$password 

[Install]
WantedBy=multi-user.target
EOF

sudo chmod 640 /etc/systemd/system/massad.service
sudo chown $(whoami):$(id -gn) /etc/systemd/system/massad.service
sudo systemctl daemon-reload
echo "The massad service has been created."
echo

echo "To start the massad service:"
echo "sudo systemctl start massad"
echo

echo "To check the status of the massad service:"
echo "sudo systemctl status massad"
echo

echo "To logs of the massa node:"
echo "sudo journalctl -u massad -f -o cat"
echo

echo "To restart the massad service:"
echo "sudo systemctl restart massad"
echo

echo "To stop the massad service:"
echo "sudo systemctl stop massad"
echo

echo "To disable the massad service from starting at boot:"
echo "sudo systemctl disable massad"
echo

echo "To remove the massad service configuration:"
echo "sudo systemctl stop massad"
echo "sudo systemctl disable massad"
echo "sudo rm /etc/systemd/system/massad.service"
echo "sudo systemctl daemon-reload"
