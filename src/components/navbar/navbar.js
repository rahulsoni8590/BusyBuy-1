import styles from "./navbar.module.css";
import Product from "../product/product";
import { NavLink, Link } from "react-router-dom";
import HomeIcon from "../../asset/home.png";
import OrdersIcon from "../../asset/basket.png";
import SignIn from "../../asset/Log in.png";
import Logout from "../../asset/Log Out.png";
import Cart from "../../asset/cart.png";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, handleLogout } = useAuth();
  // console.log(user);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.main}>
          <div>BusyBuy</div>
        </div>
        <div className={styles.homelogin}>
          <NavLink
            style={({ isActive }) =>
              isActive ? { background: "grey" } : undefined
            }
            to={"/"}
          >
            <div className={styles.navEle}>
              <div className={styles.imgContainer} alt="img">
                <img src={HomeIcon}></img>
              </div>
              <div>Home</div>
            </div>
          </NavLink>

          {user ? (
            <>
            <NavLink style={({ isActive }) =>
                  isActive ? { background: "grey" } : undefined
                }
                to={"order"}>

              <div className={styles.navEle}>
                <div className={styles.imgContainer}>
                  <img src={OrdersIcon} alt="img"></img>
                </div>
                <div>MyOrder</div>
              </div>
              </NavLink>

              <NavLink
                style={({ isActive }) =>
                  isActive ? { background: "grey" } : undefined
                }
                to={"cart"}
              >
                <div className={styles.navEle}>
                  <div className={styles.imgContainer}>
                    <img src={Cart} alt="img"></img>
                  </div>
                  <div>Cart</div>
                </div>
              </NavLink>

              <div onClick={handleLogout}>
                <div className={styles.navEle}>
                  <div className={styles.imgContainer}>
                    <img src={Logout} alt="img"></img>
                  </div>
                  <div>LogOut</div>
                </div>
              </div>
            </>
          ) : (
            <NavLink
              style={({ isActive }) =>
                isActive ? { background: "lighgrgb(224, 221, 221)" } : undefined
              }
              to={"login"}
            >
              <div className={styles.navEle}>
                <div className={styles.imgContainer} alt="img">
                  <img src={SignIn}></img>
                </div>
                <div>SignIn</div>
              </div>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}
