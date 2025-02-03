import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useLoan} from '../../context/LoanContext';

const Results: React.FC = () => {
  const navigation = useNavigation();
  const {loanData} = useLoan();
  const [showAmortization, setShowAmortization] = useState(false);

  // Validate loanData
  if (
    !loanData ||
    typeof loanData.paymentEveryMonth !== 'number' ||
    typeof loanData.totalPayments !== 'number' ||
    typeof loanData.totalInterest !== 'number' ||
    !Array.isArray(loanData.amortizationSchedule)
  ) {
    console.error('Invalid loanData:', loanData);
    return <Text>No loan data available</Text>;
  }

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Group amortization schedule by year
  const groupedByYear = loanData.amortizationSchedule.reduce(
    (acc, item, index) => {
      const year = Math.ceil((index + 1) / 12); // Calculate year based on period index
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    },
    {} as Record<number, any[]>,
  );

  const years = Object.keys(groupedByYear).map(Number).sort();

  return (
    <>
      <Header title="Results" onBackPress={handleBackPress} />
      <View style={styles.container}>
        {/* Display Summary Results */}
        <View style={styles.summaryContainer}>
          <Text style={styles.label}>Payment Every Month</Text>
          <Text style={styles.value}>
            ${loanData.paymentEveryMonth.toFixed(2)}
          </Text>
          <Text style={styles.label}>
            Total Payments ({loanData.amortizationSchedule.length} Payments)
          </Text>
          <Text style={styles.value}>${loanData.totalPayments.toFixed(2)}</Text>
          <Text style={styles.label}>Total Interest</Text>
          <Text style={styles.value}>${loanData.totalInterest.toFixed(2)}</Text>
        </View>

        {/* Toggle Button for Amortization Schedule */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAmortization(!showAmortization)}>
          <Text style={styles.buttonText}>
            {showAmortization
              ? 'Hide Amortization Schedule'
              : 'View Amortization Schedule'}
          </Text>
        </TouchableOpacity>

        {/* Amortization Schedule Table with Sticky Headers */}
        {showAmortization && (
          <FlatList
            data={years} // Use years as the data source
            keyExtractor={item => item.toString()}
            stickyHeaderIndices={[0]} // Make the first row (header) sticky
            ListHeaderComponent={
              <View style={styles.stickyTableHeader}>
                <Text style={styles.columnHeader}>Period</Text>
                <Text style={styles.columnHeader}>Beginning Balance</Text>
                <Text style={styles.columnHeader}>Interest</Text>
                <Text style={styles.columnHeader}>Principal</Text>
                <Text style={styles.columnHeader}>Ending Balance</Text>
              </View>
            }
            renderItem={({item: year}) => {
              const items = groupedByYear[year];

              return (
                <>
                  {/* Render rows for this year */}
                  {items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.cell}>{item.period}</Text>
                      <Text style={styles.cell}>
                        ${item.beginningBalance.toFixed(2)}
                      </Text>
                      <Text style={styles.cell}>
                        ${item.interest.toFixed(2)}
                      </Text>
                      <Text style={styles.cell}>
                        ${item.principal.toFixed(2)}
                      </Text>
                      <Text style={styles.cell}>
                        ${item.endingBalance.toFixed(2)}
                      </Text>
                    </View>
                  ))}
                  {/* Year Header (Centered Across the Row) */}
                  <View style={styles.yearRow}>
                    <Text style={styles.yearHeader}>Year {year}</Text>
                  </View>
                </>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export {Results};
