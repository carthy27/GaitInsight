import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0A1930',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    alignSelf: 'center'

  },
  // Add these styles to your dashboardStyles.ts file
analysisHistoryContainer: {
  marginTop: 15,
  width: '100%',
},
analysisCard: {
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly lighter background
  borderRadius: 8,
  padding: 12,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)', // Subtle border
  marginVertical: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
analysisHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#334155',
  paddingBottom: 8,
},
analysisDate: {
  fontSize: 16,
  fontWeight: '600',
  color: '#FFFFFF', // White text
},
analysisScore: {
  fontSize: 16,
  fontWeight: 'bold',
  paddingVertical: 3,
  paddingHorizontal: 8,
  borderRadius: 12,
  color: '#FFFFFF', // White text

},
scoreHigh: {
  backgroundColor: '#064e3b',
  color: '#d1fae5',
},
scoreMedium: {
  backgroundColor: '#854d0e',
  color: '#fef3c7',
},
scoreLow: {
  backgroundColor: '#7f1d1d',
  color: '#fee2e2',
},
metricsGrid: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 12,
},
metricColumn: {
  flex: 1,
},
metricHeader: {
  fontSize: 15,
  fontWeight: '600',
  color: '#94a3b8',
  marginBottom: 5,
},
metricRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 3,
},
metricLabel: {
  color: '#cbd5e1',
  fontSize: 14,
},
metricValue: {
  color: '#FFFFFF', // White text
  fontSize: 14,
  fontWeight: '500',
},
recommendationsContainer: {
  marginTop: 10,
  borderTopWidth: 1,
  borderTopColor: '#334155',
  paddingTop: 8,
},
recommendationsHeader: {
  fontSize: 15,
  fontWeight: '600',
  color: '#94a3b8',
  marginBottom: 5,
  
},
recommendationItem: {
  fontSize: 14,
  marginBottom: 3,
  lineHeight: 20, 
  color: '#FFFFFF', // White text

},
noDataText: {
  color: '#94a3b8',
  fontSize: 16,
  textAlign: 'center',
  marginVertical: 20,
},
newAnalysisButton: {
  backgroundColor: '#3b82f6',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignSelf: 'center',
  marginTop: 15,
},
newAnalysisButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
},
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center'
  },
  
  // Add these new styles for the logo and title
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  filledButton: {
    backgroundColor: '#4CAF50', // Green color for filled fields
    borderColor: '#388E3C',     // Darker green border
  },
  emptyButton: {
    backgroundColor: '#FFA726', // Orange color for empty fields
    borderColor: '#FB8C00',     // Darker orange border
  },
  viewToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 20,
    padding: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly lighter than background
  },
  activeToggleButton: {
    backgroundColor: '#FF69B4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  toggleButtonText: {
    fontWeight: 'bold',
  color: '#FF69B4'
  },
  activeToggleText: {
     color: '#FFFFFF'
    
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#0A1930', // Keep dark blue
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  subjectButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 6,
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  explanationContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignContent: 'center',
    textAlign: 'center'
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
       alignContent: 'center',
    textAlign: 'center'
  },
  // Add these to your styles file
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for contrast
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
modalContent: {
  backgroundColor: '#0A1930',
  borderRadius: 12,
  padding: 20,
  width: '100%',
  maxHeight: '80%',
  borderWidth: 2,
  borderColor: '#FF69B4', // Pink border
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 15,
  textAlign: 'center',
  color: '#FFFFFF',
},
modalButtonRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
},
modalButton: {
  color: '#FFFFFF', // White text
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 6,
},
modalButtonText: {
  color: '#FFFFFF', // White text
  fontWeight: 'bold',
},
metricsPreview: {
  marginTop: 8,
  paddingHorizontal: 10,
},
metricPreviewText: {
  fontSize: 14,
  color: '#FFFFFF', // White text
},
viewMoreText: {
  fontSize: 14,
  color: '#4a90e2',
  marginTop: 5,
  textAlign: 'right',
},
  signOutButton: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30,
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  runnerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  runnerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  runnerScore: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  runnerLevel: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 12,
  },
  metricsContainer: {
    marginTop: 8,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  // Add these styles to your DashboardStyles.tsx file
  inputContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  analysisSummaryContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  summaryButton: {
    backgroundColor: '#3a86ff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  uploadButton: {
    backgroundColor: '#FF69B4', // Pink border
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  analyzeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  videoPreview: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoName: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  metricInputContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});