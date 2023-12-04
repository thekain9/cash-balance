import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer'; // Import renderer for snapshot testing
import { Provider } from 'react-redux';
import store from './store/store'; 
import App from './App';


describe('App component', () => {
  // Snapshot test for initial rendering
  test('renders initial value (snapshot)', () => {
    // Render the App component wrapped in the Redux Provider with the store
    const tree = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Convert the rendered component tree to JSON for snapshot comparison
    const treeJSON = tree.toJSON();

    // Expect the rendered tree to match the stored snapshot
    expect(treeJSON).toMatchSnapshot();
  });



  // Test: Verify that fetch data works correctly
  test('fetch data works correctly', async () => {
    // Mock the fetch function to return a predefined response
    const mockResponse = { datetime: '2023-08-30T12:34:56' };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const fetchButton = screen.getByText('Date and time');
    fireEvent.click(fetchButton);

    // Wait for the response and check if the fetched time is displayed
    const fetchedTimeElement = await screen.findByText('Date and time: 2023-08-30T12:34:56');
    expect(fetchedTimeElement).toBeInTheDocument();

    // Clean up the mock after the test
    global.fetch.mockRestore();
  });

  //-------------------FUNCITONAL TESTS--------------------


  // Test: Verify that the value updates correctly after a deposit
  test('updates value after deposit', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const depositButton = screen.getByText('Deposit');
    const inputElement = screen.getByLabelText('Value:');
    
    fireEvent.change(inputElement, { target: { value: '100' } });
    fireEvent.click(depositButton);

    const updatedValueElement = screen.getByText('£100');
    expect(updatedValueElement).toBeInTheDocument();
  });

  // Test: Verify that the value updates correctly after a withdraw
  test('updates value after withdraw', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const withdrawButton = screen.getByText('Withdraw');
    const inputElement = screen.getByLabelText('Value:');
    
    fireEvent.change(inputElement, { target: { value: '50' } });
    fireEvent.click(withdrawButton);

    const updatedValueElement = screen.getByText('£50'); // Assuming withdraws can result in negative balance

    expect(updatedValueElement).toBeInTheDocument();
  });

  // Test: Verify that the value updates correctly after adding interest
  test('updates value after adding interest', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addInterestButton = screen.getByText('Add Interest');

    fireEvent.click(addInterestButton);

    const updatedValueElement = screen.getByText('£52.5'); // Assuming initial value was £50, and 5% interest

    expect(updatedValueElement).toBeInTheDocument();
  });

  // Test: Verify that the value updates correctly after applying charges
  test('updates value after applying charges', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const chargesButton = screen.getByText('Charges');

    fireEvent.click(chargesButton);

    const updatedValueElement = screen.getByText('£44.63'); // Assuming initial value was £50, and 15% charges

    expect(updatedValueElement).toBeInTheDocument();
  });
});
