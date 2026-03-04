import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@heroui/react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/Authcontext";

export default function myNavbar() {
 const {authToken,nullToken}= useContext(authContext)
const isToken=!!authToken
const navigate=useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = isToken?[
    "Profile",
    "Home",
  ]:[
    "Login",
    "Register",
  ];
  function handleLogOut(){
    localStorage.removeItem('tkn')
    navigate('/login')
    nullToken()
  }
  return (
    <Navbar className="bg-gray-400  " onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand>
        <p className="font-bold text-inherit">SOCIAL</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {isToken ? "":<>
        <NavbarItem>
          <Link color="foreground" to="/login">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link aria-current="page" color="secondary" to="/register">
            Register
          </Link>
        </NavbarItem></>}
       {isToken ?  <NavbarItem>
          <Link color="foreground" to="/home">
            Home
          </Link>
        </NavbarItem>:''}
      </NavbarContent>
        {isToken ? <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">
              <Link className=" block" to='/profile'>Profile</Link>
            </DropdownItem>
            
            <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>:''}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              
              to={`/${item}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

