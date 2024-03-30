import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { zinc } from 'tailwindcss/colors';

import { queryClient } from '~/data/query-client';
import { supabase } from '~/data/supabase';

const KEYBOARD_DATA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];

export function CreateWeight() {
  const [changed, setChanged] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);

  async function handleInsert() {
    const response = await supabase.from('weight').insert({ value: +changed });

    if (response.status === 201) {
      await queryClient.invalidateQueries({ queryKey: ['get-all-weights-query'] });

      bottomSheetRef.current?.collapse();

      setChanged('');
    }

    // data.push(response.data);
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={useMemo(() => ['9%', '75%'], [])}
      backgroundStyle={{
        borderTopWidth: 1,
        borderTopColor: zinc[200],
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      }}
      handleIndicatorStyle={{ marginTop: 20 }}>
      <View className="flex-1 items-center">
        <View className="p-10 w-full rounded-t-2xl bg-white">
          <View className="flex-row items-center justify-between">
            <Text className="text-zinc-700 font-im text-xs -tracking-wide uppercase">
              Set your weight
            </Text>

            <View className="flex-row items-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleInsert}
                className="h-12 px-10 rounded-full items-center justify-center bg-zinc-700 mr-2.5">
                <Text className="font-ir text-white text-[12px]">Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => bottomSheetRef.current?.collapse()}
                hitSlop={{ right: 30, bottom: 10 }}>
                <Ionicons name="close" size={16} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="items-center justify-center my-10">
            <Text className="font-um text-[24px]">{changed || '00'}</Text>
          </View>

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
    </BottomSheet>
  );
}
