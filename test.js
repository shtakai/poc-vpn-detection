function detectVPN() {
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return fetch(`https://ipapi.co/json`)
  .then(function(response) { return response.json() })
  .then(function (data) { 
    var ipTimezone = data.timezone
    console.log(`browser timezone: ${browserTimezone}`, `ip timezone: ${ipTimezone}`)
    return {
      browser: browserTimezone,
      ip: ipTimezone,
      usingVPN: ipTimezone != browserTimezone
    }
  })
}

detectVPN()
.then(function(result) {
  var body = document.getElementById('body')
  var element = document.getElementById('detection-result')
  var text = result.usingVPN ? element.textContent = "We know you're using a VPN" : element.textContent = "Ah, thanks for not using a VPN"
  result.usingVPN ? body.style.backgroundColor = '#FF4343' : body.style.backgroundColor = '#00CC6A'

  document.getElementById("browser-timezone").textContent = result.browser
  document.getElementById("ip-timezone").textContent = result.ip
})