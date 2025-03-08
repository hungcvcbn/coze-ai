import { loginGoogle } from '@/helpers/api/system'
import { GoogleLogin } from '@react-oauth/google'

interface Props { }

const ConnectGoogle = (props: Props) => {
  const handleLoginGoogle = async (credentialResponse: any) => {
    try {
      const response = await loginGoogle({
        clientId: credentialResponse?.clientId,
        token: credentialResponse.credential,
      })
      console.log('response', response)
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div className="flex-1 flex items-start gap-2">
      <div className="md:text-16-24 text-14-20 font-inter-500">
        <div className="relative">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLoginGoogle(credentialResponse)
            }}
            logo_alignment={'center'}
            type={'standard'}
            text={'signin_with'}
            shape={'pill'}
            size={'large'}
            onError={() => {
              console.log('Login Failed')
            }}
            containerProps={{}}
          />
        </div>
      </div>
    </div>
  )
}

export default ConnectGoogle
