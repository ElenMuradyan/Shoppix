import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { ID } from 'react-native-appwrite';
import { storage } from '@/lib/appwrite';
import mime from 'mime/lite';

export interface ImageUploadProps {
  onFinish: (url: string) => void;
  handleDelete?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFinish, handleDelete }) => {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileUri = asset.uri;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (!fileInfo.exists || !fileInfo.size) {
          Alert.alert('Ֆայլի չափը անհայտ է', 'Չհաջողվեց ստանալ նկարի չափսը');
          return;
        }

        const fileType = mime.getType(fileUri) || 'image/jpeg';
        const fileName = asset.fileName ?? `image-${Date.now()}.jpg`;

        const uploaded = await storage.createFile(
          process.env.EXPO_PUBLIC_BUCKET_ID!,
          ID.unique(),
          {
            name: fileName,
            type: fileType,
            uri: fileUri,
            size: fileInfo.size,
          }
        );

        const previewUrl = `${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.EXPO_PUBLIC_BUCKET_ID}/files/${uploaded.$id}/view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`;

        setImages((prev) => [...prev, previewUrl]);
        onFinish(previewUrl);
        Alert.alert('Նկարը հաջողությամբ վերբեռնվել է։');
      }
    } catch (error: any) {
      console.error('Appwrite Upload Error:', error);
      Alert.alert('Սխալ', error.message || 'Չհաջողվեց վերբեռնել նկարը');
    }
  };

  const removeImage = async (url: string) => {
    try {
      const fileId = url.split('/').pop()?.split('?')[0];
      if (!fileId) return;

      await storage.deleteFile(process.env.EXPO_PUBLIC_BUCKET_ID!, fileId);
      setImages((prev) => prev.filter((img) => img !== url));
      handleDelete?.(url);
      Alert.alert('Ջնջված է', 'Նկարը հաջողությամբ ջնջվել է։');
    } catch (error: any) {
      console.error('Appwrite Delete Error:', error);
      Alert.alert('Ձախողում', error.message || 'Չհաջողվեց ջնջել նկարը');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Նկարներ</Text>
      <View style={styles.imageList}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img }} style={styles.image} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeImage(img)}
            >
              <Ionicons name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Ionicons name="add" size={30} color="#555" />
          <Text style={styles.uploadText}>Ավելացնել</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  imageWrapper: {
    margin: 6,
    position: 'relative',
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  deleteButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  uploadButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  uploadText: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
});

export default ImageUpload;