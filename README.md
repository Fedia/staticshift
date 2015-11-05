# Staticshift
Host your static website on OpenShift Online with [WebDAV](https://wikipedia.org/wiki/WebDAV).

## Installation
(1) Get an account at [OpenShift Online](https://www.openshift.com) (it's free)

(2) Create a [new application](https://openshift.redhat.com/app/console/application_types) based on Node.js cartridge and Git URL: https://github.com/Fedia/staticshift

![New app form screenshot](https://cloud.githubusercontent.com/assets/1292964/10955298/e0ef1c2c-8363-11e5-84a3-54848611d3e1.png)

(3) Done! The website will be avaliable at _appname-your_namespace.rhcloud.com_.

Please note your OpenShift application ID - 32 random characters, e.g. `563a8a152d5271d4490000bb`. You will need it later to manage your website. 

![App ID screenshot](https://cloud.githubusercontent.com/assets/1292964/10956134/3ce3f844-836a-11e5-87c7-9c4f68d845f4.png)

## Managing files
Staticshift is a WebDAV server, so your website can be mounted as a "network drive" in Windows Explorer or OSX Finder. Further reading: https://doc.owncloud.org/server/7.0/user_manual/files/files.html

**Server URL:** http**s**://appname-your_namespace.rhcloud.com

**Username:** _any_

**Password:** OpenShift application ID, e.g. `563a8a152d5271d4490000bb`

Please upload `/404.html` to make "Page Not Found" error more friendly.

## Custom domain
OpenShift allows to use your own domain instead of _appname-namespace.rhcloud.com_.
Please see the docs: https://developers.openshift.com/en/managing-domains-ssl.html#using-a-custom-domain
