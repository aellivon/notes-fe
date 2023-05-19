import { useState } from 'react'
import { IAuthenticatedUserProfile } from '../../../../../domain/entities/users/auth/user-profile-auth.entity'
import truncate from '../../../utils/truncate'
import { useOnClickOutside } from '../../../utils/useOnClickOutside'
import { IconContext } from 'react-icons'
import { 
  HiOutlineSquares2X2, HiOutlineBars3, HiXMark, HiOutlineCalendar, 
  HiOutlineChartBarSquare, HiOutlineClipboardDocumentList, HiOutlineBuildingOffice, 
  HiOutlineBuildingStorefront, HiOutlineUserGroup, HiOutlineUser, HiArrowLeftOnRectangle, HiOutlineCog8Tooth
} from "react-icons/hi2";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';


export interface ISidebarViewModel {
  currentUser: IAuthenticatedUserProfile,
  logOutFunc: () => void,
  setNavBarFunc: (state: boolean) => void
  navBarState: boolean
  highLight: string
  adminGroupOpen?: boolean
}

export const SidebarView: React.FC<ISidebarViewModel> = (props) => {
  const navigate = useNavigate();

  // Display only javascripts
  let hideNavMenu = props.navBarState

  let [saleMenuGroupOpen, setsaleMenuGroupOpen] = useState(false)
  let [adminMenuGroupOpen, setadminMenuGroupOpen] = useState(props.adminGroupOpen ? props.adminGroupOpen : false)
  let [showSettingMenu, setShowSettingMenu] = useState(false)

  const [clickOutsideCallback] = useOnClickOutside(() => {
    setShowSettingMenu(false)
  })


  let saleMenuAdditionalClasses = ""

  if (!saleMenuGroupOpen) {
    saleMenuAdditionalClasses = "hidden"
  } else {
    saleMenuAdditionalClasses = ""
  }

  
  let adminMenuAdditionalClasses = ""

  // Maybe ternary is better here?
  if (!adminMenuGroupOpen) {
    adminMenuAdditionalClasses = "hidden"
  } else {
    adminMenuAdditionalClasses = ""
  }

  let mainClasses = ""
  let closeButtonAdditionalClass = ""
  let openButtonAdditionalClass = ""

  if (hideNavMenu) {
    closeButtonAdditionalClass = "hidden"
    mainClasses = "absolute w-64 md:w-64 xl:w-64 xl:translate-x-0 z-10 -translate-x-full"
  } else {
    mainClasses = "absolute w-full md:w-64 xl:w-64 z-10 translate-x-0"
    openButtonAdditionalClass = "hidden"
  }

  let cogAdditionalClasses = ""
  let cogMenuAdditionalClasses = ""

  if(showSettingMenu) {
    cogAdditionalClasses = "color-white text-white"
    cogMenuAdditionalClasses = "absolute m-0 -translate-y-full -translate-x-1/3 md:translate-x-0"
  } else {
    cogAdditionalClasses = ""
    cogMenuAdditionalClasses = "hidden"
  }

  return (
    <>
      <div className="z-40 flex justify-between bg-salesPrimary absolute xl:-translate-y-full translate-y-0 w-full p-7 ease-in-out duration-100 transition-height">
        <div className="flex justify-between items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1000 1000" fill="none">
          <path d="M489.5 226.499C328 231.632 280 346.999 269 409.499C283.333 386.332 328.5 335.5 395 335.5C472.5 335.5 531.5 422 567.5 449C611.237 481.803 699.123 525.115 814.5 490C906.5 462 949.167 364.332 958.5 317.999C914 378.499 846.5 414.838 763 371.999C705.5 342.499 662.5 221 489.5 226.499Z" fill="#07B6D5"/>
          <path d="M261 500.999C99.5 506.132 51.5 621.499 40.5 683.999C54.8333 660.832 100 610 166.5 610C244 610 303 696.5 339 723.5C382.737 756.303 470.623 799.615 586 764.5C678 736.5 720.667 638.832 730 592.499C685.5 652.999 618 689.338 534.5 646.499C477 616.999 434 495.5 261 500.999Z" fill="#07B6D5"/>
        </svg>
          <p className="leading-6 text-2xl text-white">Sunny Tool</p>
        </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          {/* Three menu line */}
          <button aria-label="open" id="open" onClick={() => {props.setNavBarFunc(false)}} className={` focus:outline-none focus:ring-2 ${openButtonAdditionalClass}`}>
          <IconContext.Provider value={{ className:"w-6 h-6 text-white" }}>
            <HiOutlineBars3/>
          </IconContext.Provider>
          </button>
          {/* Close */}
          <button aria-label="close" id="close" onClick={() => {props.setNavBarFunc(true)}} className={` focus:outline-none focus:ring-2 ${closeButtonAdditionalClass}`}>
            <IconContext.Provider value={{ className:"w-6 h-6 text-white" }}>
              <HiXMark/>
            </IconContext.Provider>
          </button>
        </div>
      </div>
        <div className={`ease-in-out flex justify-start items-start h-full transition-width duration-500 bg-salesPrimary flex-col ${mainClasses}`}>
          <div className="opacity-0 xl:opacity-100 z-1 xl:flex justify-start p-7 items-center space-x-3">
            {/* Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1000 1000" fill="none">
              <path d="M489.5 226.499C328 231.632 280 346.999 269 409.499C283.333 386.332 328.5 335.5 395 335.5C472.5 335.5 531.5 422 567.5 449C611.237 481.803 699.123 525.115 814.5 490C906.5 462 949.167 364.332 958.5 317.999C914 378.499 846.5 414.838 763 371.999C705.5 342.499 662.5 221 489.5 226.499Z" fill="#07B6D5"/>
              <path d="M261 500.999C99.5 506.132 51.5 621.499 40.5 683.999C54.8333 660.832 100 610 166.5 610C244 610 303 696.5 339 723.5C382.737 756.303 470.623 799.615 586 764.5C678 736.5 720.667 638.832 730 592.499C685.5 652.999 618 689.338 534.5 646.499C477 616.999 434 495.5 261 500.999Z" fill="#07B6D5"/>
            </svg>
            <p className="leading-6 text-2xl text-white">Sunny Tool</p>
          </div>
          <div className="mt-6 flex flex-col justify-start items-center pl-7 w-full border-salesSecondary border-b space-y-3 pb-5 ">
            <button onClick={() => {navigate("/dashboard")}} className={`flex jusitfy-start items-center space-x-6 w-full  focus:outline-none focus:text-white hover:text-white rounded ` + (props.highLight === "dashboard" ? 'text-white' : 'text-salesSecondary')}>
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
              <p className={`text-md leading-5 uppercase ` + (props.highLight === "members" ? 'text-white' : 'text-salesSecondary')}>管理</p>
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
              <button onClick={() => {navigate("/members")}}
                className={`flex jusitfy-start items-center space-x-6 w-full  focus:outline-none focus:text-white hover:text-white rounded px-3 py-2  w-full md:w-52 ` + (props.highLight === "members" ? 'text-white' : 'text-salesSecondary')}>
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
                      <img className="rounded-full h-10	w-10" src={props.currentUser.avatarURL} alt="avatar" />
                    </div>
                    <div className="flex justify-start flex-col items-start">
                      <p className="cursor-pointer text-md leading-5 text-white">{truncate(props.currentUser.displayName, 12)}</p>
                      <p className="cursor-pointer text-xs leading-3 text-white ">{truncate(props.currentUser.email, 25)}</p>
                    </div>
                  </div>
                  <div className="relative flex justify-center items-center">
                    <button
                      className={`focus:outline-none `} 
                      type="button"
                      onClick={() => setShowSettingMenu(!showSettingMenu)}
                    >
                      <span className="w-2">
                        <IconContext.Provider value={{ className:`w-6 h-6 hover:text-white focus:text-white text-salesSecondary ${cogAdditionalClasses}` }}>
                            <HiOutlineCog8Tooth/>
                      </IconContext.Provider>
                      </span>
                    </button>
                    <div ref={clickOutsideCallback} className={`absolute z-[1000] float-left p-3 min-w-max list-none overflow-hidden rounded-lg border-none bg-clip-padding text-left text-base shadow-sm shadow-white bg-salesPrimary flex justify-center items-center ${cogMenuAdditionalClasses}`}>
                      <button className="flex justify-start items-center space-x-6 hover:text-white focus:text-white text-salesSecondary hover:text-white rounded pl-3 pr-9 pb-0  w-100" onClick={() => {props.logOutFunc()}}>
                        <IconContext.Provider value={{ className:"w-6 h-6" }}>
                          <HiArrowLeftOnRectangle/>
                        </IconContext.Provider>
                        <p className="leading-4">ログアウト</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

