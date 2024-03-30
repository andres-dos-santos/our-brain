import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import { DietItem } from '~/components/diet-item';
import { supabase } from '~/data/supabase';

interface Data {
  name: string;
  created_at: string;
}

export default function ShoppingListPage() {
  const { data } = useQuery({
    queryKey: ['get-all-shopping-list-query'],
    queryFn: async () => {
      const response = await supabase.from('shopping-list').select('name,created_at');

      return response.data as Data[];
    },
  });

  return (
    <View className="px-10 pt-16">
      <Link asChild href="/">
        <Pressable className="items-center flex-row rounded-full bg-white" hitSlop={40}>
          <Ionicons name="arrow-back" />

          <Text className="font-im text-zinc-800 text-[13px] -tracking-wide ml-3">
            SHOPPING LIST
          </Text>
        </Pressable>
      </Link>

      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{ paddingTop: 40, paddingBottom: 80 }}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => <DietItem index={index} item={item.name} />}
      />
    </View>
  );
}
