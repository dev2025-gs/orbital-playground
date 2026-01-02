Run the following in the local machine
```
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -f apsdevops01_16_58_66_15

code apsdevops01_16_58_66_15
code apsdevops01_16_58_66_15.pub

chmod 0400 apsdevops01_16_58_66_15

```

username: apsdevops01
password: Apsdevops)!
publicip EC2: 16.58.66.15
app dir: /opt/seolith/aps
```
sudo adduser apsdevops01

sudo usermod -aG sudo apsdevops01

su apsdevops01
Apsdevops)!


mkdir -p ~/.ssh

nano ~/.ssh/authorized_keys

```

Paste the new public key on new line

Ctrl + X 

to close and save

Lock down the access

```
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Create a directory for the app to deploy

```
sudo mkdir -p /opt/seolith/aps
sudo chown -R $USER:$USER /opt/seolith/aps
```

How to remote in from terminal?

GPU
    ssh -i C:\Users\raghu\.ssh\apsdevops01_16_58_66_15 apsdevops01@16.58.66.15     
NUC
    ssh -i C:\Users\kanch\.ssh\apsdevops01_16_58_66_15 apsdevops01@16.58.66.15

GitBash
     ssh -i ~/.ssh/apsdevops01_16_58_66_15 apsdevops01@16.58.66.15