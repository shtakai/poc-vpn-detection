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
.then(function(detectionResult) {
  var body = document.getElementById('body')
  var result = document.getElementById('detection-result')
  var details = document.getElementById('result-details')

  detectionResult.usingVPN ? result.textContent = "We know you're using a VPN" : result.textContent = "Ah, thanks for not using a VPN"
  detectionResult.usingVPN ? body.style.backgroundColor = '#FF4343' : body.style.backgroundColor = '#00CC6A'

  
  document.getElementById("browser-timezone").textContent = result.browser
  document.getElementById("ip-timezone").textContent = result.ip
  details.style.display = 'block'
})
.catch(function(err) {
  var body = document.getElementById('body')
  var result = document.getElementById('detection-result')
  var errorDetail = document.getElementById('error-detail')
  
  result.textContent = "There was an error detecting your VPN"
  errorDetail.textContent = err.message
})