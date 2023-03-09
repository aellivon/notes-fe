import { useState } from 'react'
import { IUserProfile } from '../../../core/domain/user-profile-interface.type'
import truncate from '../../../core/services/shortcuts/truncate'
import { IconContext } from 'react-icons'
import { 
  HiOutlineSquares2X2, HiOutlineBars3, HiXMark, HiOutlineCalendar, 
  HiOutlineChartBarSquare, HiOutlineClipboardDocumentList, HiOutlineBuildingOffice, 
  HiOutlineBuildingStorefront, HiOutlineUserGroup, HiOutlineUser
} from "react-icons/hi2";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";


export interface ISidebarViewModel {
  currentUser: IUserProfile
}

export const SidebarView: React.FC<ISidebarViewModel> = (props) => {

  // Display only javascripts
  let [saleMenuGroupOpen, setsaleMenuGroupOpen] = useState(false)
  let [adminMenuGroupOpen, setadminMenuGroupOpen] = useState(false)
  let [showNavMenu, setShowNavMenu] = useState(false)


  let saleMenuAdditionalClasses = ""

  if (!saleMenuGroupOpen) {
    saleMenuAdditionalClasses = "hidden"
  } else {
    saleMenuAdditionalClasses = ""
  }

  
  let adminMenuAdditionalClasses = ""

  if (!adminMenuGroupOpen) {
    adminMenuAdditionalClasses = "hidden"
  } else {
    adminMenuAdditionalClasses = ""
  }

  let mainClasses = ""
  let closeButtonAdditionalClass = ""
  let openButtonAdditionalClass = ""

  if (showNavMenu) {
    mainClasses = "-translate-x-full"
    closeButtonAdditionalClass = "hidden"
  } else {
    mainClasses = "translate-x-0"
    openButtonAdditionalClass = "hidden"
  }

  return (
    <>
      <div className="flex justify-between bg-salesPrimary xl:hidden w-full p-7">
        <div className="flex justify-between items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1000 1000" fill="none">
          <path d="M489.5 226.499C328 231.632 280 346.999 269 409.499C283.333 386.332 328.5 335.5 395 335.5C472.5 335.5 531.5 422 567.5 449C611.237 481.803 699.123 525.115 814.5 490C906.5 462 949.167 364.332 958.5 317.999C914 378.499 846.5 414.838 763 371.999C705.5 342.499 662.5 221 489.5 226.499Z" fill="#07B6D5"/>
          <path d="M261 500.999C99.5 506.132 51.5 621.499 40.5 683.999C54.8333 660.832 100 610 166.5 610C244 610 303 696.5 339 723.5C382.737 756.303 470.623 799.615 586 764.5C678 736.5 720.667 638.832 730 592.499C685.5 652.999 618 689.338 534.5 646.499C477 616.999 434 495.5 261 500.999Z" fill="#07B6D5"/>
        </svg>
          <p className="leading-6 text-2xl text-white">ビジタイズ</p>
        </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          {/* Three menu line */}
          <button aria-label="open" id="open" onClick={() => {setShowNavMenu(false)}} className={` focus:outline-none focus:ring-2 ${openButtonAdditionalClass}`}>
          <IconContext.Provider value={{ className:"w-6 h-6 text-white" }}>
            <HiOutlineBars3/>
          </IconContext.Provider>
          </button>
          {/* Close */}
          <button aria-label="close" id="close" onClick={() => {setShowNavMenu(true)}} className={` focus:outline-none focus:ring-2 ${closeButtonAdditionalClass}`}>
            <IconContext.Provider value={{ className:"w-6 h-6 text-white" }}>
              <HiXMark/>
            </IconContext.Provider>
          </button>
        </div>
      </div>
      <div className={`md:rounded-r transform  xl:translate-x-0 md:w-64 ease-in-out transition duration-500 flex justify-start items-start h-full  w-full bg-salesPrimary flex-col ${mainClasses}`}>
        <div className="hidden xl:flex justify-start p-7 items-center space-x-3">
          {/* Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1000 1000" fill="none">
            <path d="M489.5 226.499C328 231.632 280 346.999 269 409.499C283.333 386.332 328.5 335.5 395 335.5C472.5 335.5 531.5 422 567.5 449C611.237 481.803 699.123 525.115 814.5 490C906.5 462 949.167 364.332 958.5 317.999C914 378.499 846.5 414.838 763 371.999C705.5 342.499 662.5 221 489.5 226.499Z" fill="#07B6D5"/>
            <path d="M261 500.999C99.5 506.132 51.5 621.499 40.5 683.999C54.8333 660.832 100 610 166.5 610C244 610 303 696.5 339 723.5C382.737 756.303 470.623 799.615 586 764.5C678 736.5 720.667 638.832 730 592.499C685.5 652.999 618 689.338 534.5 646.499C477 616.999 434 495.5 261 500.999Z" fill="#07B6D5"/>
          </svg>
          <p className="leading-6 text-2xl text-white">ビジタイズ</p>
        </div>
        <div className="mt-6 flex flex-col justify-start items-center pl-7 w-full border-salesSecondary border-b space-y-3 pb-5 ">
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none focus:text-white  text-salesSecondary hover:text-white  rounded ">
            <IconContext.Provider value={{ className:"w-6 h-6 " }}>
              <HiOutlineSquares2X2/>
            </IconContext.Provider>
            <p className="leading-4">ダッシュボード</p>
          </button>
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none focus:text-white  text-salesSecondary hover:text-white  rounded ">
            <IconContext.Provider value={{ className:"w-6 h-6 " }}>
              <HiOutlineCalendar/>
            </IconContext.Provider>
            <p className="leading-4">スケジュール</p>
          </button>
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none focus:text-white  text-salesSecondary hover:text-white  rounded ">
            <IconContext.Provider value={{ className:"w-6 h-6 " }}>
              <HiOutlineChartBarSquare/>
            </IconContext.Provider>
            <p className="leading-4">プロジェクト</p>
          </button>
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none focus:text-white  text-salesSecondary hover:text-white  rounded ">
            <IconContext.Provider value={{ className:"w-6 h-6 " }}>
              <MdOutlineRecordVoiceOver/>
            </IconContext.Provider>
            <p className="leading-4">顧客管理</p>
          </button>
        </div>
        <div className="flex flex-col justify-start items-center   px-6 border-b pb-1 border-salesSecondary w-full text-salesSecondary hover:text-white">
          <button onClick={() => {setsaleMenuGroupOpen(!saleMenuGroupOpen)}} className="focus:outline-none focus:text-white text-left flex justify-between items-center w-full py-5 space-x-14 ">
            <p className="text-md leading-5 uppercase">営業課</p>
            {
              !saleMenuGroupOpen ?  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            }
          </button>
          <div className={`flex justify-start  flex-col w-full md:w-auto items-start pb-1 ${saleMenuAdditionalClasses}`}>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:text-white text-salesSecondary hover:text-white rounded px-3 py-2  w-full md:w-52">

              <IconContext.Provider value={{ className:"w-6 h-6 " }}>
                <SlScreenDesktop/>
              </IconContext.Provider>
              <p className="leading-4">製品/サービス</p> 
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:text-white text-salesSecondary hover:text-white rounded px-3 py-2  w-full md:w-52">
              <IconContext.Provider value={{ className:"w-6 h-6 " }}>
                <HiOutlineClipboardDocumentList/>
              </IconContext.Provider>
              <p className="leading-4">アンケート</p> 
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:text-white text-salesSecondary hover:text-white rounded px-3 py-2  w-full md:w-52">
              <IconContext.Provider value={{ className:"w-6 h-6 " }}>
                <HiOutlineBuildingOffice/>
              </IconContext.Provider>
              <p className="leading-4">会社概要</p> 
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center   px-6 border-salesSecondary w-full text-salesSecondary hover:text-white">
          <button onClick={() => {setadminMenuGroupOpen(!adminMenuGroupOpen)}} className="focus:outline-none focus:text-white text-left flex justify-between items-center w-full py-5 space-x-14  ">
            <p className="text-md leading-5 uppercase">管理</p>
            {
              !adminMenuGroupOpen ?  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            }
          </button>
          <div className={`flex justify-start  flex-col w-full md:w-auto items-start pb-1 ${adminMenuAdditionalClasses}`}>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:text-white text-salesSecondary hover:text-white rounded px-3 py-2  w-full md:w-52">
              <IconContext.Provider value={{ className:"w-6 h-6 " }}>
                <HiOutlineBuildingStorefront/>
              </IconContext.Provider>
              <p className="leading-4">組織設定</p> 
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:text-white text-salesSecondary hover:text-white rounded px-3 py-2  w-full md:w-52">
              <IconContext.Provider value={{ className:"w-6 h-6 " }}>
                <HiOutlineUserGroup/>
              </IconContext.Provider>
              <p className="leading-4">グループ</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:text-white text-salesSecondary hover:text-white rounded px-3 py-2  w-full md:w-52">
              <IconContext.Provider value={{ className:"w-6 h-6 " }}>
                <HiOutlineUser/>
              </IconContext.Provider>
              <p className="leading-4">会員管理</p> 
            </button>
          </div>
        </div>
        <div className="relative h-full w-full">
          <div className="absolute inset-x-0 bottom-0 h-16 w-full">
            <div className="flex flex-col justify-between items-center h-full pb-6   px-6  w-full  space-y-32  ">

              <div className=" flex justify-between items-center w-full">
                <div className="flex justify-center items-center  space-x-2">
                  <div>
                    <img className="rounded-full h-10	w-10" src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
                  </div>
                  <div className="flex justify-start flex-col items-start">
                    <p className="cursor-pointer text-md leading-5 text-white">{truncate(props.currentUser.displayName, 12)}</p>
                    <p className="cursor-pointer text-xs leading-3 text-white ">{truncate(props.currentUser.email, 25)}</p>
                  </div>
                </div>
                <svg className="cursor-pointer ml-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
