import jwt from 'jsonwebtoken'

const SignToken = async (email) => {
  const token = await jwt.sign({ id: email }, process.env.NEXTAUTH_SECRET, {
    expiresIn: '1d',
  })
  return token
}

export default SignToken
