import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useTabSwitch = (tabs, defaultTab) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  const handleTabSwitch = (tab) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setCurrentTab(tab);
    }
  };

  return [currentTab, handleTabSwitch];
};

export default useTabSwitch;
