import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ImageSourcePropType, TextInput } from 'react-native';
import { useAuth } from '../context/AuthContext';
import GaitMetrics from '../View/component/GaitMetricsCard';
import GaitMetricsData, { getTopSubjects, getSubjectById, getRunningSubjects } from '../Model/gaitMetricsData';
import { Asset } from 'expo-asset';
import { dashboardStyles as styles } from '../View/styles/DashboardStyles';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';

export default function AboutScreen() {
  const { user, signOut, loading } = useAuth();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'running'| 'walking'>('running');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [experience, setExperience] = useState<string>('beginner');
  const [injuries, setInjuries] = useState<string>('');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<ImageSourcePropType | null>(null);
  const [userAnalyses, setUserAnalyses] = useState<any[]>([]);
  const [showAnalysisHistory, setShowAnalysisHistory] = useState(false);
  const [showAnalysisSummary, setShowAnalysisSummary] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  // Load the image properly
  useEffect(() => {
    async function loadImage() {
      try {
        // Try loading the image from assets
        const image = require('../assets/LogoGaitInsight.png');
        setImageUri(image);
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    }
    
    loadImage();
  }, []);
  
  // Get either a specific subject or the top-scoring subjects for walking
  const walkingData = selectedSubjectId 
    ? [getSubjectById(selectedSubjectId)].filter(Boolean) 
    : getTopSubjects(3);
    
  // Get running subjects
  const runningSubjects = getRunningSubjects();
  
  // Which data should we display based on mode?
  const displayData = viewMode === 'running' ? runningSubjects : walkingData;

  const handleSignOut = async () => {
    try {
      await signOut();
      // The rest will be handled by the auth state change in AuthContext
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Determine runner level based on form score
  const getRunnerLevel = (score: number): 'beginner' | 'intermediate' | 'advanced' => {
    if (score > 70) return 'advanced';
    if (score > 45) return 'intermediate';
    return 'beginner';
  };

  // Format walking metrics for display
  const formatWalkingMetrics = (metrics: any) => {
    return [
      {
        name: 'Vertical Oscillation',
        value: metrics.VERTICAL_OSCILLATION,
        unit: 'mm',
        description: 'Up and down movement during stride'
      },
      {
        name: 'Oscillation Asymmetry',
        value: metrics.VERTICAL_OSCILLATION_ASYMMETRY,
        unit: '%',
        description: 'Difference between sides'
      },
      {
        name: 'Stride Length',
        value: metrics.STRIDE_LENGTH,
        unit: 'm',
        description: 'Distance covered per stride'
      },
      {
        name: 'Stride Rate',
        value: metrics.STRIDE_RATE, 
        unit: 'spm',
        description: 'Strides per minute'
      }
    ];
  };

  // Format running metrics with running-specific descriptions
  const formatRunningMetrics = (subject: any) => {
    return [
      {
        name: 'Vertical Oscillation',
        value: subject.VERTICAL_OSCILLATION,
        unit: 'mm',
        description: 'Up-and-down movement while running',
        ideal: '60-80mm for efficient runners',
        asymmetry: subject.VERTICAL_OSCILLATION_ASYMMETRY
      },
      {
        name: 'Stride Length',
        value: subject.STRIDE_LENGTH,
        unit: 'm',
        description: 'Distance covered per stride',
        ideal: '~2.1-2.5m for experienced runners',
        asymmetry: subject.STRIDE_LENGTH_ASYMMETRY
      },
      {
        name: 'Stride Rate',
        value: subject.STRIDE_RATE,
        unit: 'spm',
        description: 'Steps per minute (cadence)',
        ideal: '170-180+ for efficient running',
        asymmetry: subject.STRIDE_RATE_ASYMMETRY
      },
      {
        name: 'Step Width',
        value: subject.STEP_WIDTH,
        unit: 'm',
        description: 'Side-to-side foot placement',
        ideal: '~0.05-0.10m for most runners',
        asymmetry: subject.STEP_WIDTH_ASYMMETRY
      },
      {
        name: 'Knee Flexion',
        value: Math.abs(subject.KNEE_FLEX_PEAK_ANGLE || 0),
        unit: '°',
        description: 'Peak knee bend during stride',
        ideal: '~40° for optimal running',
        asymmetry: Math.abs(subject.KNEE_FLEX_PEAK_ANGLE_ASYMMETRY || 0)
      },
      {
        name: 'Foot Progression',
        value: Math.abs(subject.FOOT_PROG_ANGLE || 0),
        unit: '°',
        description: 'Foot angle during stance',
        ideal: 'Typically 0-15° outward rotation',
        asymmetry: Math.abs(subject.FOOT_PROG_ANGLE_ASYMMETRY || 0)
      }
    ];
  };
  const generateMockAnalysis = () => {
    // Create random data that looks realistic
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    return {
      id: `analysis-${Date.now()}`,
      date: formattedDate,
      formScore: Math.floor(45 + Math.random() * 40), // Score between 45-85
      metrics: {
        cadence: Math.floor(165 + Math.random() * 20),
        verticalOscillation: Math.floor(70 + Math.random() * 30),
        strideLength: (1.9 + Math.random() * 0.6).toFixed(2),
        kneeFlexion: Math.floor(35 + Math.random() * 15),
        footProgression: Math.floor(5 + Math.random() * 10),
      },
      asymmetry: {
        cadence: Math.floor(Math.random() * 8),
        verticalOscillation: Math.floor(Math.random() * 12),
        strideLength: Math.floor(Math.random() * 10),
      },
      recommendations: [
        "Focus on increasing your cadence slightly to reduce impact forces",
        "Work on reducing vertical oscillation through core strengthening exercises",
        "Consider stride length efficiency drills to optimize your form"
      ].filter(() => Math.random() > 0.5), // Randomly select some recommendations
    };
  };

  // Inside your component, add a helper function to check if a field is filled
  const isFieldFilled = (fieldName: string): boolean => {
    switch (fieldName) {
      case 'height':
        return height.trim() !== '';
      case 'weight':
        return weight.trim() !== '';
      case 'pace':
        return pace.trim() !== '';
      case 'distance':
        return distance.trim() !== '';
      case 'injuries':
        return injuries.trim() !== '';
      case 'experience':
        return true; // Always filled since it has a default value
      default:
        return false;
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/LogoGaitInsight.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoTitle}>Gait Insight</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome {user?.displayName || user?.email}</Text>
        
        {/* Toggle between walking and running view */}
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'walking' && styles.activeToggleButton]}
            onPress={() => setViewMode('walking')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'walking' && styles.activeToggleText]}>
              Analyse my Gait ! 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'running' && styles.activeToggleButton]}
            onPress={() => setViewMode('running')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'running' && styles.activeToggleText]}>
              Running Logs
            </Text>
          </TouchableOpacity>
        </View>
        
        {viewMode === 'walking' ? (
          <View style={styles.sectionContainer}>
             <Text style={styles.sectionTitle}></Text>
             <Text style={styles.sectionSubtitle}>
               {selectedSubjectId 
                 ? `Viewing Subject ${selectedSubjectId}` 
                 : 'Here we are going to put your running video through our model and tell you your weaknesses '}
             </Text>
        
           <View style={styles.buttonContainer}>
              {/* Create category buttons for the different metrics */}
              <TouchableOpacity
                style={[
                  styles.subjectButton, 
                  selectedMetric === 'height' && styles.activeButton,
                  isFieldFilled('height') ? styles.filledButton : styles.emptyButton
                ]}
                onPress={() => setSelectedMetric('height')}
              >
                <Text style={styles.buttonText}>Height</Text>
                {isFieldFilled('height') && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.subjectButton, 
                  selectedMetric === 'weight' && styles.activeButton,
                  isFieldFilled('weight') ? styles.filledButton : styles.emptyButton
                ]}
                onPress={() => setSelectedMetric('weight')}
              >
                <Text style={styles.buttonText}>Weight</Text>
                {isFieldFilled('weight') && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.subjectButton, 
                  selectedMetric === 'pace' && styles.activeButton,
                  isFieldFilled('pace') ? styles.filledButton : styles.emptyButton
                ]}
                onPress={() => setSelectedMetric('pace')}
              >
                <Text style={styles.buttonText}>Running Pace</Text>
                {isFieldFilled('pace') && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.subjectButton, 
                  selectedMetric === 'distance' && styles.activeButton,
                  isFieldFilled('distance') ? styles.filledButton : styles.emptyButton
                ]}
                onPress={() => setSelectedMetric('distance')}
              >
                <Text style={styles.buttonText}>Weekly Distance</Text>
                {isFieldFilled('distance') && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF"  />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.subjectButton, 
                  selectedMetric === 'experience' && styles.activeButton,
                  isFieldFilled('experience') ? styles.filledButton : styles.emptyButton
                ]}
                onPress={() => setSelectedMetric('experience')}
              >
                <Text style={styles.buttonText}>Experience</Text>
                {isFieldFilled('experience') && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF"  />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.subjectButton, 
                  selectedMetric === 'injuries' && styles.activeButton,
                  isFieldFilled('injuries') ? styles.filledButton : styles.emptyButton
                ]}
                onPress={() => setSelectedMetric('injuries')}
              >
                <Text style={styles.buttonText}>Injuries</Text>
                {isFieldFilled('injuries') && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF"  />
                )}
              </TouchableOpacity>
            </View>

            {/* Display the input for the selected metric */}
            {selectedMetric === 'height' && (
              <View style={styles.metricInputContainer}>
                <Text style={styles.inputLabel}>Your Height (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your height in cm"
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                  value={height}
                  onChangeText={setHeight}
                />
              </View>
            )}

            {selectedMetric === 'weight' && (
              <View style={styles.metricInputContainer}>
                <Text style={styles.inputLabel}>Your Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your weight in kg"
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>
            )}

            {selectedMetric === 'pace' && (
              <View style={styles.metricInputContainer}>
                <Text style={styles.inputLabel}>Typical Running Pace</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your pace (min/km)"
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                  value={pace}
                  onChangeText={setPace}
                />
              </View>
            )}

            {selectedMetric === 'distance' && (
              <View style={styles.metricInputContainer}>
                <Text style={styles.inputLabel}>Weekly Running Distance</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter km per week"
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                  value={distance}
                  onChangeText={setDistance}
                />
              </View>
            )}

            {selectedMetric === 'experience' && (
              <View style={styles.metricInputContainer}>
                <Text style={styles.inputLabel}>Running Experience Level</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={experience}
                    onValueChange={(itemValue: string) => setExperience(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Beginner (< 1 year)" value="beginner" />
                    <Picker.Item label="Intermediate (1-3 years)" value="intermediate" />
                    <Picker.Item label="Advanced (3+ years)" value="advanced" />
                  </Picker>
                </View>
              </View>
            )}

            {selectedMetric === 'injuries' && (
              <View style={styles.metricInputContainer}>
                <Text style={styles.inputLabel}>Current Injuries or Pain</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Describe any current injuries or pain points"
                  placeholderTextColor="#888"
                  multiline={true}
                  numberOfLines={3}
                  value={injuries}
                  onChangeText={setInjuries}
                />
              </View>
            )}
            
              <Text style={styles.sectionSubtitle}>
                Upload Video for Analysis
              </Text>
              
              <TouchableOpacity
  style={styles.uploadButton}
  onPress={() => {
    // You can implement a file picker here
    // For example using expo-document-picker or expo-image-picker
    alert('Video selection functionality will be implemented here');
  }}
>
  <Text style={styles.uploadButtonText}>Select Video</Text>
</TouchableOpacity>
              
{/* Display selected video name if available */}
{/* Add file name display here */}
              
<TouchableOpacity
  style={styles.analyzeButton}
  onPress={() => {    
    const newAnalysis = generateMockAnalysis();
    setUserAnalyses([newAnalysis, ...userAnalyses]);
    setCurrentAnalysis(newAnalysis);
    setShowAnalysisModal(true); // Show modal instead of summary in page
    setSelectedMetric(null);
  }}
>
  <Text style={styles.analyzeButtonText}>Analyze My Running Form</Text>
</TouchableOpacity>
            </View>
        ) : (
          <View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Running Form Analysis Logs</Text>
  
  {userAnalyses.length === 0 ? (
    <View style={styles.explanationContainer}>
      <Text style={styles.explanationTitle}>No Analysis Logs Yet</Text>
      <Text style={styles.explanationText}>
        {`Runner form analysis can help identify inefficiencies and potential injury risks in your running mechanics.

Switch to "Analyse my Gait!" tab to upload a video and get your running form analyzed.`}
      </Text>
    </View>
  ) : (
    <>
      <Text style={styles.sectionSubtitle}>Your Running Analysis History</Text>
      {userAnalyses.map((analysis, index) => (
        <TouchableOpacity 
          key={analysis.id} 
          style={styles.analysisCard}
          onPress={() => {
            setCurrentAnalysis(analysis);
            setShowAnalysisModal(true);
          }}
        >
          <View style={styles.analysisHeader}>
            <Text style={styles.analysisDate}>Analysis {index + 1} - {analysis.date}</Text>
            <Text style={[
              styles.analysisScore,
              analysis.formScore > 70 ? styles.scoreHigh : 
              analysis.formScore > 50 ? styles.scoreMedium : styles.scoreLow
            ]}>
              Form Score: {analysis.formScore}
            </Text>
          </View>
          
          <View style={styles.metricsPreview}>
            <Text style={styles.metricPreviewText}>
              Cadence: {analysis.metrics.cadence} spm | 
              Stride: {analysis.metrics.strideLength} m | 
              VO: {analysis.metrics.verticalOscillation} mm
            </Text>
            <Text style={styles.viewMoreText}>Tap to view details →</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  )}
</View>
        )}
        {/* Show analysis history */}
{showAnalysisHistory && (
  <View style={styles.analysisHistoryContainer}>
    <Text style={styles.sectionSubtitle}>Your Running Analysis History</Text>
    
    {userAnalyses.length === 0 ? (
      <Text style={styles.noDataText}>No analyses found. Upload a video to get started!</Text>
    ) : (
      userAnalyses.map((analysis, index) => (
        <View key={analysis.id} style={styles.analysisCard}>
          <View style={styles.analysisHeader}>
            <Text style={styles.analysisDate}>Analysis {index + 1} - {analysis.date}</Text>
            <Text style={[
              styles.analysisScore,
              analysis.formScore > 70 ? styles.scoreHigh : 
              analysis.formScore > 50 ? styles.scoreMedium : styles.scoreLow
            ]}>
              Form Score: {analysis.formScore}
            </Text>
          </View>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricColumn}>
              <Text style={styles.metricHeader}>Key Metrics</Text>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Cadence:</Text>
                <Text style={styles.metricValue}>{analysis.metrics.cadence} spm</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Vertical Oscillation:</Text>
                <Text style={styles.metricValue}>{analysis.metrics.verticalOscillation} mm</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Stride Length:</Text>
                <Text style={styles.metricValue}>{analysis.metrics.strideLength} m</Text>
              </View>
            </View>
            
            <View style={styles.metricColumn}>
              <Text style={styles.metricHeader}>Asymmetry</Text>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Cadence:</Text>
                <Text style={styles.metricValue}>{analysis.asymmetry.cadence}%</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Vertical:</Text>
                <Text style={styles.metricValue}>{analysis.asymmetry.verticalOscillation}%</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Stride:</Text>
                <Text style={styles.metricValue}>{analysis.asymmetry.strideLength}%</Text>
              </View>
            </View>
          </View>
          
          {analysis.recommendations.length > 0 && (
            <View style={styles.recommendationsContainer}>
              <Text style={styles.recommendationsHeader}>Recommendations:</Text>
              {analysis.recommendations.map((rec: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: React.Key | null | undefined) => (
                <Text key={idx} style={styles.recommendationItem}>• {rec}</Text>
              ))}
            </View>
          )}
        </View>
      ))
    )}
    
    <TouchableOpacity
      style={styles.newAnalysisButton}
      onPress={() => {
        setShowAnalysisHistory(false);
      }}
    >
      <Text style={styles.newAnalysisButtonText}>New Analysis</Text>
    </TouchableOpacity>
  </View>
)}
        
        {/* Add this right before the SignOut button */}
{showAnalysisSummary && currentAnalysis && (
  <View style={styles.analysisSummaryContainer}>
    <Text style={styles.sectionTitle}>Your Running Analysis Results</Text>
    
    <View style={styles.analysisCard}>
      <View style={styles.analysisHeader}>
        <Text style={styles.analysisDate}>Analysis from {currentAnalysis.date}</Text>
        <Text style={[
          styles.analysisScore,
          currentAnalysis.formScore > 70 ? styles.scoreHigh : 
          currentAnalysis.formScore > 50 ? styles.scoreMedium : styles.scoreLow
        ]}>
          Form Score: {currentAnalysis.formScore}
        </Text>
      </View>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricColumn}>
          <Text style={styles.metricHeader}>Key Metrics</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Cadence:</Text>
            <Text style={styles.metricValue}>{currentAnalysis.metrics.cadence} spm</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Vertical Oscillation:</Text>
            <Text style={styles.metricValue}>{currentAnalysis.metrics.verticalOscillation} mm</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Stride Length:</Text>
            <Text style={styles.metricValue}>{currentAnalysis.metrics.strideLength} m</Text>
          </View>
        </View>
        
        <View style={styles.metricColumn}>
          <Text style={styles.metricHeader}>Asymmetry</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Cadence:</Text>
            <Text style={styles.metricValue}>{currentAnalysis.asymmetry.cadence}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Vertical:</Text>
            <Text style={styles.metricValue}>{currentAnalysis.asymmetry.verticalOscillation}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Stride:</Text>
            <Text style={styles.metricValue}>{currentAnalysis.asymmetry.strideLength}%</Text>
          </View>
        </View>
      </View>
      
      {currentAnalysis.recommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsHeader}>Recommendations:</Text>
          {currentAnalysis.recommendations.map((rec: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: React.Key | null | undefined) => (
            <Text key={idx} style={styles.recommendationItem}>• {rec}</Text>
          ))}
        </View>
      )}
      
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.summaryButton}
          onPress={() => {
            setShowAnalysisSummary(false);
            setShowAnalysisHistory(true);
          }}
        >
          <Text style={styles.summaryButtonText}>View History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.summaryButton}
          onPress={() => {
            setShowAnalysisSummary(false);
          }}
        >
          <Text style={styles.summaryButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}
        
        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={handleSignOut}
          disabled={loading}
        >
          <Text style={styles.signOutButtonText}>
            {loading ? 'Signing Out...' : 'Sign Out'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Analysis Results Modal */}
      <Modal
        visible={showAnalysisModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAnalysisModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Running Form Analysis</Text>
            
            {currentAnalysis && (
              <>
                <View style={styles.analysisHeader}>
                  <Text style={styles.analysisDate}>Analysis from {currentAnalysis.date}</Text>
                  <Text style={[
                    styles.analysisScore,
                    currentAnalysis.formScore > 70 ? styles.scoreHigh : 
                    currentAnalysis.formScore > 50 ? styles.scoreMedium : styles.scoreLow
                  ]}>
                    Form Score: {currentAnalysis.formScore}
                  </Text>
                </View>
                
                <View style={styles.metricsGrid}>
                  <View style={styles.metricColumn}>
                    <Text style={styles.metricHeader}>Key Metrics</Text>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Cadence:</Text>
                      <Text style={styles.metricValue}>{currentAnalysis.metrics.cadence} spm</Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Vertical Oscillation:</Text>
                      <Text style={styles.metricValue}>{currentAnalysis.metrics.verticalOscillation} mm</Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Stride Length:</Text>
                      <Text style={styles.metricValue}>{currentAnalysis.metrics.strideLength} m</Text>
                    </View>
                  </View>
                  
                  <View style={styles.metricColumn}>
                    <Text style={styles.metricHeader}>Asymmetry</Text>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Cadence:</Text>
                      <Text style={styles.metricValue}>{currentAnalysis.asymmetry.cadence}%</Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Vertical:</Text>
                      <Text style={styles.metricValue}>{currentAnalysis.asymmetry.verticalOscillation}%</Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={styles.metricLabel}>Stride:</Text>
                      <Text style={styles.metricValue}>{currentAnalysis.asymmetry.strideLength}%</Text>
                    </View>
                  </View>
                </View>
                
                {currentAnalysis.recommendations.length > 0 && (
                  <View style={styles.recommendationsContainer}>
                    <Text style={styles.recommendationsHeader}>Recommendations:</Text>
                    {currentAnalysis.recommendations.map((rec: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: React.Key | null | undefined) => (
                      <Text key={idx} style={styles.recommendationItem}>• {rec}</Text>
                    ))}
                  </View>
                )}
              </>
            )}
            
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowAnalysisModal(false);
                  setViewMode('running'); // Switch to running logs view
                }}
              >
                <Text style={styles.modalButtonText}>View in Running Logs</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowAnalysisModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
  
}
