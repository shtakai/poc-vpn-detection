# Simple VPN detection ([Demo](https://simple-vpn-detector.netlify.com/))

![](assets/demo.gif)

I wanted to explore an idea for how to implement a VPN detection service à la Netflix or any other geo-restricted content.

## The Idea

Client side Javascript runs on your browser and gets time information independent of your IP address.

By comparing the timezone of the browser with that of the IP address reported, we can pretty easily tell if someone is using a VPN to get around a geo-restriction (and tell quite a bit about the location of the user too)

### How to test
* clone this repository
* Run `index.html` (I use `http-server` from NPM to serve a static server)
* Refresh the page after turning on your VPN

## Solution

Remember to change your computer timezone to match your VPN 😉