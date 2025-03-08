import { loginGoogle } from '@/helpers/api/system'
import { LOGIN_CLIENT_ID, REFRESH_TOKEN, TOKEN } from '@/helpers/constants'
import { GoogleLogin } from '@react-oauth/google'
import { setCookie } from 'cookies-next'
import { useRouter } from "next/navigation";

interface Props { }

const ConnectGoogle = (props: Props) => {
  const router = useRouter();
  const handleLoginGoogle = async (credentialResponse: any) => {
    try {
      const res = await loginGoogle({
        clientId: LOGIN_CLIENT_ID,
        token: credentialResponse.credential,
      })
      if (res?.data) {
        setCookie(TOKEN, res.data.accessToken)
        setCookie(REFRESH_TOKEN, res.data.refreshToken)
        router.push('/control-panel')
      }
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
