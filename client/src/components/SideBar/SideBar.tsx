import styles from './SideBar.module.css'
import { menuItems } from './parts/itemsmenu'
import NavHeader from './parts/NavHeader'
import NavButton from './parts/NavButton'
import SubMenu from './parts/SubMenu'

function SideBar({ setActiveItem, activeItem }: any): JSX.Element {
  const handleClick = (item: string): void => {
    setActiveItem(item !== activeItem ? item : '')
  }

  return (
    <aside className={styles.sidebar}>
      <NavHeader />
      {menuItems.map((item) => (
        <>
          {item.items === undefined && <NavButton key={item.id} onClick={handleClick} name={item.name} icon={item.icon} isActive={activeItem === item.name} hasSubNav={false} />}
          {item.items !== undefined && (
            <>
              <NavButton onClick={handleClick} name={item.name} icon={item.icon} isActive={activeItem === item.name} hasSubNav={true} />
              <SubMenu activeItem={activeItem} handleClick={handleClick} item={item} />
            </>
          )}
        </>
      ))}
    </aside>
  )
}

export default SideBar
