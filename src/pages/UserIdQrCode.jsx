import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserIdQrCode = () => {
    const context = useContext(GlobalContext);
    const { token } = context;
    const navigate = useNavigate()

    const handleBack = ()=> {
        navigate('/profile')
    }
  return (
    <div className="flex h-[100vh] justify-center items-center">
        <div className="px-6 py-4 border border-gray-100 shadow-sm">
            <h2 className="text-center font-semibold text-lg mb-4">User ID + Org_id QR Code</h2>
            <QRCode size={256}
                    style={{ height: "auto" }}
                    value={token.user.id + token.user.user_metadata.org_id}
                    viewBox={`0 0 256 256`}/>
            <Button className='mt-4 w-full' type="button" onClick={handleBack}>Back</Button>
        </div>

        
    </div>
  )
}

export default UserIdQrCode
