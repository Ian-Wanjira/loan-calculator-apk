import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stickyTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0', // Light gray background for distinction
    paddingVertical: 10,
    position: 'relative', // Ensures it sticks to the top
    top: 0, // Keeps it at the top of the screen
    zIndex: 1, // Ensures it stays above other content
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  columnHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  yearRow: {
    flexDirection: 'row', // Ensure it spans the full width
    justifyContent: 'center', // Center the text horizontally
    backgroundColor: '#eaeaea', // Optional: Light background for distinction
    paddingVertical: 10, // Add vertical padding
  },
  yearHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10, // Add vertical padding
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1, // Equal width for all columns
    textAlign: 'center',
    padding: 5, // Add padding to prevent squeezing
  },
});

export {styles};
