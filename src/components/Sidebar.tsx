import { withRouter, NavLink } from 'react-router-dom';
import { useAccountState } from '../contexts/AccountContext';

type CustomNavProps = {
  link: string;
  text: string;
};

const CustomNav = ({ link, text }: CustomNavProps) => {
  return (
    <NavLink
      to={link}
      activeStyle={{
        fontWeight: 'bold',
        color: 'red',
      }}
    >
      <span className='sidebar__items__item__link'>
        <p className='sidebar__items__item__link__text'>{text}</p>
      </span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { accountType } = useAccountState();

  return (
    <aside
      className={accountType === 'DEFAULT' ? 'sidebar-app' : 'sidebar-admin'}
    >
      <ul className='sidebar__items'>
        {accountType === 'DEFAULT' ? (
          <>
            <li className='sidebar__items__item'>
              <CustomNav link='/entry1' text='Entry1' />
            </li>
            <li className='sidebar__items__item'>
              <CustomNav link='entry2' text='Entry2' />
            </li>
            <li className='sidebar__items__item'>
              <CustomNav link='entry3' text='Entry3' />
            </li>
            <li className='sidebar__items__item'>
              <CustomNav link='entry4' text='Entry4' />
            </li>
            <li className='sidebar__items__item'>
              <CustomNav link='entry5' text='Entry5' />
            </li>
          </>
        ) : (
          <>
            <li className='sidebar__items__item'>
              <CustomNav link='adminentry1' text='AdminEntry1' />
            </li>
            <li className='sidebar__items__item'>
              <CustomNav link='adminentry2' text='AdminEntry2' />
            </li>
            <li className='sidebar__items__item'>
              <CustomNav link='adminentry3' text='AdminEntry3' />
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default withRouter(Sidebar);
