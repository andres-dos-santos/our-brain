import { Ionicons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { green } from 'tailwindcss/colors';

import { queryClient } from '~/data/query-client';
import { supabase } from '~/data/supabase';

interface Props {
  item: string;
  index: number;
}

export function DietItem({ item, index }: Props) {
  const segments = useSegments();

  const [added, setAdded] = useState<string | null>(null);

  async function action(name: string) {
    if (segments[0] !== 'shopping-list') {
      const response = await supabase.from('shopping-list').insert({
        name,
      });

      if (response.status === 201) {
        setAdded(name);
      }

      setTimeout(() => setAdded(null), 2000);
    }

    if (segments[0] === 'shopping-list') {
      const response = await supabase.from('shopping-list').delete().eq('name', name);

      if (response.status === 204) {
        setAdded(name);

        await queryClient.invalidateQueries({
          queryKey: ['get-all-shopping-list-query'],
        });
      }

      setTimeout(() => setAdded(null), 2000);
    }
  }

  return (
    <Pressable onPress={() => action(item)} className="w-full flex-row items-center mb-5">
      <View className="bg-zinc-50 h-8 w-8 items-center justify-center rounded-full mr-2.5">
        <Text className="font-usb text-sm">{index + 1}</Text>
      </View>
      <Text className="font-ir text-sm">{item}</Text>

      <MotiView
        animate={{ translateX: added ? 0 : -50, opacity: added && item === added ? 1 : 0 }}
        transition={{ type: 'timing', duration: 200 }}
        className="ml-auto">
        <Ionicons name="checkmark" color={green[500]} size={15} />
      </MotiView>
    </Pressable>
  );
}
