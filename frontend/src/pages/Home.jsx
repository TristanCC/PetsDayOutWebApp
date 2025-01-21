import { Button } from '@/components/ui/button';
import Login from './Login';

function Home({ isLoggedIn, setIsLoggedIn, preferredColors, customers, selectedCustomer, setSelectedCustomer, updateCustomerInState, customerInfoRef }) {
  return (
    <>
      {isLoggedIn ? (
        <>
          {/* Remove MyTable component */}
          <a href="/login">
            <Button mt="5" variant="surface" >
              Log Out
            </Button>
          </a>
        </>
      ) : (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default Home;
