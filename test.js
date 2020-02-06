function detectVPN() {
  var browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return fetch(`https://ipapi.co/json`)
  .then(function(response) { return response.json() })
  .then(function (data) {
    var ipTimezone = data.timezone || data.region
    var ipTimeZoneregexp = new RegExp(`/?${ipTimezone}$`)
    console.log(`browser timezone: ${browserTimezone}`, `ip timezone: ${ipTimezone}`)
    var usingVpn = data.timezone ? !(data.timezone === browserTimezone) : !ipTimeZoneregexp.test(browserTimezone)
    return {
      browser: browserTimezone,
      ip: ipTimezone,
      usingVPN: usingVpn
    }
  })
}

detectVPN()
.then(function(detectionResult) {
  var body = document.getElementById('body')
  var result = document.getElementById('detection-result')
  var details = document.getElementsByClassName('result')

  detectionResult.usingVPN ? result.textContent = "We know you're using a VPN" : result.textContent = "Ah, thanks for not using a VPN"
  detectionResult.usingVPN ? body.style.backgroundColor = '#FF4343' : body.style.backgroundColor = '#00CC6A'
  body.style.color = '#fff'
  
  document.getElementById("browser-timezone").textContent = detectionResult.browser
  document.getElementById("ip-timezone").textContent = detectionResult.ip
  Array.prototype.forEach.call(details, d => d.style.display = 'block')
})
.catch(function(err) {
  var body = document.getElementById('body')
  var result = document.getElementById('detection-result')
  var details = document.getElementsByClassName("error")
  var errorDetail = document.getElementById('error-detail')
  
  result.textContent = "There was an error detecting your VPN"
  errorDetail.textContent = err.message
  Array.prototype.forEach.call(details, d => d.style.display = 'block')
})