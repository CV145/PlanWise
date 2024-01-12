import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  const handleGetStartedClick = () => {
    setShowHomeScreen(false);
  };

  return (
    <AnimatePresence>
      {showHomeScreen && (
        <HomeScreen onGetStartedClick={handleGetStartedClick} />
      )}
      {!showHomeScreen && <SearchScreen />}
    </AnimatePresence>
  );
};

export default App;
