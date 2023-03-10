import { useState } from 'react'
import { IUserProfile } from '../../../core/domain/user-profile-interface.type'
import truncate from '../../../core/services/shortcuts/truncate'
import { IconContext } from 'react-icons'
import { 
  HiOutlineSquares2X2, HiOutlineBars3, HiXMark, HiOutlineCalendar, 
  HiOutlineChartBarSquare, HiOutlineClipboardDocumentList, HiOutlineBuildingOffice, 
  HiOutlineBuildingStorefront, HiOutlineUserGroup, HiOutlineUser, HiArrowLeftOnRectangle, HiOutlineCog8Tooth
} from "react-icons/hi2";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";


export interface IHeaderViewModel {
  currentUser: IUserProfile
}

export const HeaderView: React.FC<IHeaderViewModel> = (props) => {

  // Display only javascripts
  let [saleMenuGroupOpen, setsaleMenuGroupOpen] = useState(false)
  let [adminMenuGroupOpen, setadminMenuGroupOpen] = useState(false)
  let [hideNavMenu, setHideNavMenu] = useState(true)
  let [showSettingMenu, setShowSettingMenu] = useState(false)

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
    mainClasses = "-translate-x-full"
    closeButtonAdditionalClass = "hidden"
  } else {
    mainClasses = "translate-x-0"
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
      <div className="">
          Hi
      </div>
    </>
  )
}

