import React from 'react'
import DefaultAvatar from '../assets/avatar-default-symbolic-svgrepo-com.png'
import { DropdownArrow } from '../icons'
const Avatar = (props) => {
    const {imgSrc, menu, ...restProps} = props
  return (
    <div className="avatar items-center cursor-pointer">
			<div {...restProps}>
				<img src={imgSrc ?? DefaultAvatar} />
				{/* <img src={imgSrc ? imgSrc : defaultAvatar} /> */}
			</div>
			{ menu && 
					<DropdownArrow className="absolute -bottom-2 -right-1 w-4"/>
			}
		</div>
  )
}

export default Avatar
