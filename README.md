# Assets Management System RMUTI KKC (Backend, NodeJs Express )

   ปริญญานิพนธ์ครั้งนี้มีจุดประสงค์ เพื่อพัฒนาระบบการจัดการครุภัณฑ์ผ่านเว็บไซต์และระบบปฏิบัติการแอนดรอยด์ โดยส่วนประกอบหลักในระบบการทำงานของเว็บไซต์และแอปพลิเคชัน คือการจัดเก็บข้อมูล และตรวจสอบสถานะของครุภัณฑ์ จะทำการตรวจสอบสถานะของครุภัณฑ์ผ่านการสแกนคิวอาร์โค้ด ซึ่งเป็นบาร์โค้ด 2 มิติ ที่มีการอ่านข้อมูลอย่างรวดเร็ว จึงนำมาเป็นเครื่องมือในการช่วยให้เจ้าหน้าที่ผู้รับผิดชอบตรวจสอบครุภัณฑ์หรือผู้ใช้งานสามารถเข้าถึงข้อมูล สถานะ และตำแหน่งของครุภัณฑ์ได้อย่างง่ายและสะดวกมากขึ้น ทดแทนการจัดการและตรวจสอบครุภัณฑ์แบบการใช้เอกสาร และใช้ระยะเวลาในการตรวจสอบ ซึ่งระบบการจัดการครุภัณฑ์ผ่านเว็บไซต์และระบบปฏิบัติการ  แอนดรอยด์จะช่วยอำนวยความสะดวกในการตรวจสอบครุภัณฑ์ให้รวดเร็ว และมีประสิทธิภาพมากยิ่งขึ้น

   จากการพัฒนาระบบตามขอบเขตและแผนการปฏิบัติงาน จะได้เว็บไซต์การจัดการข้อมูลครุภัณฑ์ที่มีการจัดเก็บรายละเอียดละข้อมูลของครุภัณฑ์ และนำข้อมูลของครุภัณฑ์มาสร้างเป็นคิวอาร์โค้ดหรือบาร์โค้ด 2 มิติ และได้แอปพลิเคชันที่ใช้งานบนระบบปฏิบัติการแอนดรอยด์ ที่สามารถดูรายละเอียดของครุภัณฑ์ ตาม หมวดหมู่ และสถานะของครุภัณฑ์ รวมไปถึงการอัปเดตสถานะ และเปลี่ยนสถานที่ตั้งของครุภัณฑ์ได้ผ่านการสแกนคิวอาร์โค้ด

## สาธิตการใช้งาน https://youtu.be/cCGkwXezHSg
# เครดิต
#### Watcharachai Samkhan
#### Isariya Roopkhan

# คู่มือการติดตั้ง
- Deploy on Ubuntu Version: **20.04**  
- พัฒนาบน Node Version: **16.13.0**  
- ระบบฐานข้อมูลเป็น **MySQL** 

## ติดตั้ง Environment (Development)
 #### Installing Node.js® and NPM on Windows
 > 1. Download Node.js Installer: [Download | Node.js (nodejs.org)](https://nodejs.org/en/download/)
 > 2. Install Node.js and NPM from Browser
 > 
	1) Once the installer finishes downloading, launch it. Open the  **downloads**  link in your browser and click the file. Or, browse to the location where you have saved the file and double-click it to launch.
	2) The system will ask if you want to run the software – click  **Run**.
	3) You will be welcomed to the Node.js Setup Wizard – click  **Next**.
	4) On the next screen, review the license agreement. Click  **Next**  if you agree to the terms and install the software.
	5) The installer will prompt you for the installation location. Leave the default location, unless you have a specific need to install it somewhere else – then click  **Next**.
	6) The wizard will let you select components to include or remove from the installation. Again, unless you have a specific need, accept the defaults by clicking  **Next**.
	7) Finally, click the  **Install**  button to run the installer. When it finishes, click  **Finish**.
>3. Verify Installation 
	>node -v
		npm -v
		-> Output 
			node: v16.10.0
			npm: v1.5.0	
>4. อ้างอิง [How to Install Node.js and NPM on Your Windows System](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
 
 #### ติดตั้ง XAMPP เพื่อจำลอง WebServer
 >1. ทำการ [ดาวน์โหลด XMAPP](https://www.apachefriends.org/index.html)  สำหรับ Windows
 >2. อ้างอิง [ติดตั้ง XAMPP จำลอง WebServer](https://www.windowssiam.com/install-xampp-apache-mysql/)
 #### git clone โปรแกรม
 - โดยมีเครื่องมือต่างๆรองรับ เช่น **git desktop**, **sourcetree**
 >1. git clone <*repository*>
	 <*repository*> คือ URL ของ repository ที่เราต้องการจะ clone ตัวอย่างถ้าเราต้องการจะ Clone จาก github เราก็สามารถไป Copy URL จาก github ได้เลย
	 
## เมื่อติดตั้ง Environment (Development) เสร็จ
- ทำการใช้ **git clone** โปรแกรม
	 >clone https://github.../.../BE_Qr.git
 - เปิดโฟลเดอร์ที่ได้ Clone โปรแกรม
 - ให้ทำการติดตั้ง **Package** ของโปรแกรม
	 >  npm install
	 > ทดสอบ **Start** ระบบด้วย
	 > **npm start**
	 
สามารถแก้ไข Config Database ได้ที่ไฟล์ `config.js` 
>ที่อยู่ไฟล์ BE_Qr\src\config\config.js
## ติดตั้ง Environment (Deploy)
#### How To Install Node.js on Ubuntu 20.04
 > 1.  sudo apt update
 > 2.  sudo apt install nodejs
 > 3.  node -v 
 -> Output: v10.19.0
  >4.  sudo apt install npm
>5. อ้างอิง [How To Install Node.js on Ubuntu 20.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
 #### How To Install Nginx on Ubuntu 20.04
 > 1.  sudo apt update
  >2.  sudo apt install nginx - y
  >3.  systemctl status nginx
  >
  >> Output:
nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   Memory: 3.5M
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
   >4. อ้างอิง [How To Install Nginx on Ubuntu 20.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
   
 #### How To Install PM2 on Ubuntu 20.04
 > 1. sudo npm install pm2 -g
 > 2. อ้างอิง [How to Install Node.js and Pm2 in Ubuntu 20.04 - Interserver Tips](https://www.interserver.net/tips/kb/how-to-install-node-js-and-pm2-in-ubuntu-20-04/)

#### How To Install MySQL on Ubuntu 20.04
> 1.  sudo apt update
> 2.  sudo apt install mysql-server
> 3.  sudo systemctl start mysql.service
> 4. sudo mysql
> 5. systemctl status mysql.service
> 6. อ้างอิง [How To Install MySQL on Ubuntu 20.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)

#### How To Install Git on Ubuntu 20.04
>1.  sudo apt update
>2.  sudo apt install git
>3.  git --version
 -> Output: git version 2.25.1
###### Installing Git from Source.
>5.  sudo apt update
>6.  sudo apt install libz-dev libssl-dev libcurl4-gnutls-dev libexpat1-dev gettext cmake gcc
>7. อ้างอิง [How To Install Git on Ubuntu 20.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04)


##  เมื่อติดตั้ง Environment (Deploy) เสร็จ
 - cd ไปที่โฟลเดอร์ **www**
	 >cd var/www/
- ทำการใช้ **git clone** โปรแกรม
	 >sudo git clone https://github.../.../BE_Qr.git
- cd ไปที่โฟลเดอร์  **BE_Qr**
	>cd BE_Qr/
- ให้ทำการติดตั้ง **Package** ของโปรแกรม
	 > sudo npm install
	 > ทดสอบ **Start** ระบบ ด้วย **sudo npm start**
- ขอการอัพโหลดไฟล์รูปภาพ  ของโปรแกรม
	> sudo chmod -R 777 /var/www/BE_Qr/src/public/images/items
	> 
	> sudo chmod -R 777 /var/www/BE_Qr/src/public/images/damaged
	> 
	> sudo chmod -R 777 /var/www/BE_Qr/src/public/images/profiles
- ใช้ **PM2** ในการเปิดใช้งานระบบ
	> pm2 start index.js  --max-memory-restart 120M
	> 
	>***หากระบบผิดพลาดสามารถอ่าน Log โดยใช้**
	>
	> pm2 log
	> 
	>***เช็คการ Start ระบบโดยใช้**
	>
	> pm2 ls

##### ***ถ้าหากว่า path ของระบบ Backend เปลี่ยนจะส่งผลต่อระบบ  Frontend และ Application ไปด้วยในการรับส่งข้อมูล**	
##### ***ถ้าหากว่า path ของระบบ Backend เปลี่ยนจะส่งผลต่อระบบ  Frontend Web และ Application ต้องทำการ เปลี่ยน env ของแต่ละ และต้องทำการ build ใหม่ ทั้งหมด
##### ***ถ้าหากว่า path ของระบบ Backend เปลี่ยนจะส่งผลต่อระบบ  Frontend Web และ Application ต้องทำการ ไฟล์ /build ในระบบ Back-end เป็น ไฟล์ build ของ Frontend Web ถ้าหากมีการเปลี่ยนแปลง env ให้ทำการทำการ copy จาก Frontend Web มาแทนที่ build เดิม


#### *สงวนลิขสิทธิ์ ใช้ภายใน มหาวิทยาลัยเทคโนโลยี ราชมงคลอีสานวิทยาเขต ขอนแก่น.
