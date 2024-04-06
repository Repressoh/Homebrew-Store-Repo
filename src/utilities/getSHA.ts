async function getFileSHA256(env: any, object: string) {
    try {
      const file = await env.storage.get(object)
      return JSON.parse(JSON.stringify(file.checksums)).md5
    } catch (err) {
      throw new Error('Error processing the file: ' + err.message)
    }
  }

export default getFileSHA256;