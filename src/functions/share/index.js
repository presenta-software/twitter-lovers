const src = require('./index.html.json')

const err = m => {
  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html'
    },
    body: m
  }
}

const atob = (base64) => {
  return Buffer.from(base64, 'base64').toString('binary')
}

exports.handler = async (event, context) => {
  const uparts = event.path
    .replace('/f/share', '')
    .replace('/.netlify/functions/share', '')

  const parts = uparts.split('/')
  const id = parts.length > 1 ? parts[1] : null
  if (!id) return err('No Param')

  let json = null
  try {
    const src = atob(id)
    json = JSON.parse(src)
  } catch (e) {
    return err('Wrong Param')
  }

  const meta = `
      <meta property="og:type" content="website">
      <meta property="og:title" content="${json.title}">
      <meta property="og:url" content="${json.url}${event.path}">
      <meta property="og:image" content="${json.image}">
      <meta property="og:site_name" content="${json.site}">
      <meta property="og:description" content="${json.description}">

      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${json.title}">
      <meta name="twitter:url" content="${json.url}${event.path}">
      <meta name="twitter:image:src" content="${json.image}">
      <meta name="twitter:site" content="${json.site}">
      <meta name="twitter:description" content="${json.description}">
      <meta name="twitter:creator" content="@PresentaSwBot">

      <meta name="description" content="${json.description}">
      <meta name="image" content="${json.image}">

      <meta itemprop="name" content="${json.title}">
      <meta itemprop="description" content="${json.description}">
      <meta itemprop="image" content="${json.image}">

      <title>${json.title} - A Card Generator Tool made with PRESENTA.CC</title>
    `

  let html = src.html.replace('<meta injected/>', meta)
  html = html.replace('<script>window.MOCK_URL="mock.png"</script>', `<script>window.MOCK_URL="${json.image}"</script>`)

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html'
    },
    body: html
  }
}
