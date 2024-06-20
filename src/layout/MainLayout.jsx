import { Outlet} from 'react-router-dom';
//import Sidebar from '@/CustomComponets/Sidebar';
import Topbar from '@/CustomComponets/Topbar';
import ProSidebar from '@/CustomComponets/ProSidebar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <>
      <Topbar/>
      <ProSidebar/>
      <Toaster position='top-center'/>
      <Outlet/>
    </>
  )
}

export default MainLayout
