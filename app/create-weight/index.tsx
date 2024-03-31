import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { zinc } from 'tailwindcss/colors';

import { queryClient } from '~/data/query-client';
import { supabase } from '~/data/supabase';

const KEYBOARD_DATA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];

export default function CreateWeight() {
  const { back } = useRouter();

  const [changed, setChanged] = useState('');

  async function handleInsert() {
    const response = await supabase.from('weight').insert({ value: +changed });

    if (response.status === 201) {
      await queryClient.invalidateQueries({ queryKey: ['get-all-weights-query'] });

      setChanged('');

      back();
    }

    // data.push(response.data);
  }

  return (
    <View className="flex-1 pt-16">
      <View className="flex-row items-center justify-between pr-5">
        <Link asChild href="/">
          <Pressable className="px-10 items-center flex-row rounded-full bg-white" hitSlop={40}>
            <Ionicons name="arrow-back" />

            <Text className="font-im text-zinc-800 text-[13px] -tracking-wide ml-3">
              SET YOUR WEIGHT
            </Text>
          </Pressable>
        </Link>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleInsert}
          className="h-12 px-10 rounded-full items-center justify-center bg-orange-500 mr-2.5">
          <Text className="font-ir text-white text-[12px]">Confirm</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center justify-center mt-40">
        <Text className="font-um text-[24px]">{changed || '00'}</Text>
      </View>

      <View className="mt-auto bg-zinc-50 rounded-[44px] m-10 pt-10">
        <FlatList
          data={KEYBOARD_DATA}
          contentContainerStyle={{ paddingBottom: 40 }}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-1 h-20 items-center justify-center"
              activeOpacity={0.8}
              onPress={() =>
                item === 'back'
                  ? setChanged((prev) => prev.slice(0, -1))
                  : setChanged((prev) => prev.concat(item))
              }>
              {item === 'back' ? (
                <Ionicons name="backspace" size={24} color={zinc[700]} />
              ) : (
                <Text className="font-um text-[24px]">{item}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
