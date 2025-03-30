import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, ImageSourcePropType } from 'react-native';
import { useAuth } from '../context/AuthContext';
import GaitMetrics from '../View/component/GaitMetricsCard';
import GaitMetricsData, { getTopSubjects, getSubjectById, getRunningSubjects } from '../Model/gaitMetricsData';
import { Asset } from 'expo-asset';

export default function AboutScreen() {
  const { user, signOut, loading } = useAuth();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'running'| 'walking'>('running');
  const [imageUri, setImageUri] = useState<ImageSourcePropType | null>(null);
  
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

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome {user?.displayName || user?.email}</Text>
        
        {/* Display the image only if it's loaded */}
        {imageUri && (
          <Image 
            source={imageUri} 
            style={styles.logo} 
            onError={(e) => console.error("Image error:", e.nativeEvent.error)}
          />
        )}
        
        {/* Toggle between walking and running view */}
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'walking' && styles.activeToggleButton]}
            onPress={() => setViewMode('walking')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'walking' && styles.activeToggleText]}>
              Walking Gait
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'running' && styles.activeToggleButton]}
            onPress={() => setViewMode('running')}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'running' && styles.activeToggleText]}>
              Running Form
            </Text>
          </TouchableOpacity>
        </View>
        
        {viewMode === 'walking' ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Gait Analysis Results</Text>
            <Text style={styles.sectionSubtitle}>
              {selectedSubjectId 
                ? `Viewing Subject ${selectedSubjectId}` 
                : 'Top Performing Subjects'}
            </Text>
            
            {/* {walkingSubjects.map((subject) => (
              <Text key={subject.subject_id}>{subject.subject_id}</Text>
            ))} */}
            
            {/* Subject selection buttons for walking */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.subjectButton, !selectedSubjectId && styles.activeButton]}
                onPress={() => setSelectedSubjectId(null)}
              >
                <Text style={styles.buttonText}>View Top Subjects</Text>
              </TouchableOpacity>
              
              {['100433', '100671', '100824', '101054', '101552'].map(id => (
                <TouchableOpacity
                  key={id}
                  style={[styles.subjectButton, selectedSubjectId === id && styles.activeButton]}
                  onPress={() => setSelectedSubjectId(id)}
                >
                  <Text style={styles.buttonText}>Subject {id}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Running Form Analysis</Text>
            <Text style={styles.sectionSubtitle}>
              Comparative metrics across different runner profiles
            </Text>
            
            {runningSubjects.map((subject) => (
              <View key={subject.subject_id} style={styles.runnerCard}>
                <Text style={styles.runnerTitle}>Runner {subject.subject_id}</Text>
                <Text style={styles.runnerScore}>Form Score: {subject.form_score.toFixed(1)}</Text>
                <Text style={styles.runnerLevel}>Level: {getRunnerLevel(subject.form_score)}</Text>
                
                <View style={styles.metricsContainer}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Cadence:</Text>
                    <Text style={styles.metricValue}>{subject.STRIDE_RATE.toFixed(1)} spm</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Vertical Oscillation:</Text>
                    <Text style={styles.metricValue}>{subject.VERTICAL_OSCILLATION.toFixed(1)} mm</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Stride Length:</Text>
                    <Text style={styles.metricValue}>{subject.STRIDE_LENGTH.toFixed(2)} m</Text>
                  </View>
                </View>
              </View>
            ))}
            
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Understanding Running Form</Text>
              <Text style={styles.explanationText}>
                {`Runner form analysis can help identify inefficiencies and potential injury risks in your running mechanics.

Key metrics to optimize:

• Cadence: 170-180+ steps per minute reduces overstriding
• Vertical Oscillation: Minimize excessive "bouncing" for better efficiency
• Asymmetry: Lower is better - indicates balanced running form

Higher form scores correlate with improved running economy and reduced injury risk.`}
              </Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    color: '#333',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  },
  activeToggleButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  toggleButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
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
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
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
  metricLabel: {
    fontSize: 14,
    color: '#555',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
