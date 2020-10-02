import Util from '../utils/Utils'
import axios from 'axios'

const util = new Util()

class JenosizeController {
  static async searchPlace (req, res) {
    try {
      const key = process.env.GOOGLE_API_KEY || 'AIzaSyD3kbFfgA_uoLg3rKjmNqf-PqEE8sq9ElE'
      const city = req.query.city
      const {data} = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${city}&key=${key}`)
      util.setSuccess(200, 'Search Place', data)
      return util.send(res)
    } catch (e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }

  static async playGame24 (req, res) {
    try {
      const num = req.query.num
      let game24 = A => {
        let permutations = A => {
          if (A.length == 1)
            return A
          return A.reduce((res, x, i, A, B = [...A]) => {
            B.splice(i, 1)
            return res.concat(permutations(B).map(a => [].concat(x, a)))
          }, [])
        }
        let cal = (a, b, c, d, ok = false) => {
          if (a && b && c && d)
            return cal(a + b, c, d) || cal(a - b, c, d) || cal(a * b, c, d) || (b && cal(a / b, c, d)) ||
                  cal(a, b + c, d) || cal(a, b - c, d) || cal(a, b * c, d) || (c && cal(a, b / c, d)) ||
                  cal(a, b, c + d) || cal(a, b, c - d) || cal(a, b, c * d) || (d && cal(a, b, c / d))
          else if (a && b && c)
            return cal(a + b, c) || cal(a - b, c) || cal(a * b, c) || (b && cal(a / b, c)) ||
                  cal(a, b + c) || cal(a, b - c) || cal(a, b * c) || (c && cal(a, b / c))
          else if (a && b)
            return cal(a + b) || cal(a - b) || cal(a * b) || (b && cal(a / b))
          else
            return Math.abs(24 - a) < 0.0001
        }
        for (let x of permutations(A)) {
          console.log(x)
          if (cal(...x)) {
            return true
          }
        }
        return false
      }
      let nums = num.toString().split("")
      util.setSuccess(200, 'check Game24', { isGame24: game24(nums) ? 'YES' : 'NO' })
      return util.send(res)
    } catch (e) {
      util.setError(400, e.message)
      return util.send(res)
    }
  }
}

export default JenosizeController