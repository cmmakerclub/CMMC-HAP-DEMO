# cmmc-hapjs

## Prerequisites
```
 $ sudo apt-get install libavahi-compat-libdnssd-dev
 $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
 $ nvm install 8
 $ nvm use 8
 $ nvm alias default 8
```

## Installation

```
$ curl https://raw.githubusercontent.com/cmmakerclub/CMMC-HAP-DEMO/master/scripts/demo.sh | bash
```

## Homekit Accessories Demo
```
 $ npm install -g cmmc-hapjs
 $ cd ~ && git clone https://github.com/cmmakerclub/cmmc-accessories.git
 $ cd ~/cmmc-accessories
 $ npm install && cmmc-hapjs --init;
 $ cmmc-hapjs
```

## Customization
```
 $ cmmc-hjapjs -h
 $ cmmc-hapjs --bridgeName NatBridge
```

## HomeKit Accessories Templates

[https://github.com/KhaosT/HAP-NodeJS/tree/master/accessories](https://github.com/KhaosT/HAP-NodeJS/tree/master/accessories)

## Development
```
  $ cd ~
  $ git clone https://github.com/cmmakerclub/CMMC-HAP-DEMO
  $ cd CMMC-HAP-DEMO
  $ npm install
  $ node index.js
```

