async function getR2file(env: any, object: string) {
    try {
      const file = await env.storage.get(object)
      return file.body
    } catch (err) {
      throw new Error('Error gathering the file: ' + err.message)
    }
  }

export default getR2file;