import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { zinc } from 'tailwindcss/colors';

import { FireSVG } from '~/components/svgs/fire';
import { GymSVG } from '~/components/svgs/gym';
import { HamburguerSVG } from '~/components/svgs/hamburguer';
import { queryClient } from '~/data/query-client';
import { supabase } from '~/data/supabase';

const KEYBOARD_DATA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];

interface Data {
  value: number;
  created_at: string;
}

export default function Page() {
  const [changed, setChanged] = useState('');

  const { data } = useQuery({
    queryKey: ['get-all-weights-query'],
    queryFn: async () => {
      const response = await supabase.from('weight').select('value,created_at');

      return response.data as Data[];
    },
  });

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

  const last = data && data.length > 0 ? data[data.length - 1].value : 0;

  // const percentage = (last / 70) * 100;

  const hasData = data && data.length > 0;

  return (
    <>
      <Stack.Screen options={{ title: 'Overview' }} />

      <View className="flex-1 items-center pt-14">
        <View className="flex-row items-center justify-between w-full px-10 mb-10">
          <View className="h-14 w-14 rounded-full bg-zinc-100" />
        </View>

        <Text className="font-ir text-sm text-zinc-700 -tracking-wide">
          Your weight •{' '}
          {hasData
            ? `${dayjs(new Date()).diff(dayjs(data[data.length - 1].created_at), 'minutes')} minutes ago`
            : null}
        </Text>
        <View className="flex-row items-center my-10">
          <Text className="font-um text-3xl mr-2.5">{last} kg</Text>

          <FireSVG
            advanced={
              data && data.length > 0
                ? data.length === 1 || last > data[data.length - 2].value
                : false
            }
          />
          {/**<Text className="font-um text-3xl">2.5 kcal</Text> */}
        </View>

        {data && data.length > 2 ? (
          <View className="h-[50px] relative">
            <LineChart
              data={data}
              width={350}
              hideDataPoints1
              curved
              hideYAxisText
              isAnimated
              color1={zinc[700]}
              hideAxesAndRules
            />

            <Text className="font-usb text-sm absolute -tracking-wide -top-5 right-5">
              goal {70} kg
            </Text>
          </View>
        ) : null}

        <View className="mt-10 w-full flex-row items-center px-10 justify-between">
          <View className="h-44 flex-1 ml-2.5 bg-cyan-200/50 rounded-[32px] justify-between p-5">
            <View className="bg-cyan-400/20 items-center justify-center h-14 w-14 rounded-full">
              <HamburguerSVG />
            </View>
            <Text className="font-usb text-zinc-700 text-xl mb-2.5 -tracking-wide">Diet</Text>
          </View>

          <View className="h-44 flex-1 ml-2.5 bg-yellow-200/50 rounded-[32px] justify-between p-5">
            <View className="bg-yellow-400/20 items-center justify-center h-14 w-14 rounded-full">
              <GymSVG />
            </View>
            <Text className="font-usb text-zinc-700 text-xl mb-2.5 -tracking-wide">Gym</Text>
          </View>
        </View>

        {/** <View className="flex-row items-center max-w-[80%] relative mb-10">
          <View className="h-[2px] rounded-full w-full bg-zinc-200" />
          <View
            className="h-[2px] rounded-full absolute bg-zinc-700"
            style={{ width: `${percentage}%` }}
          />
        </View>

        <View className="p-10 items-center justify-center">
          <Text className="font-ir text-sm text-zinc-700 -tracking-wide mb-5">
            Your weight over time
          </Text>

          <FlatList
            className="w-[400px] px-10 flex-1"
            data={data}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-start">
                <View className="h-[2px] w-8 bg-zinc-700 mr-5" />
                <Text className="font-um text-sm">{item.value}</Text>
              </View>
            )}
          /> 
        </View>*/}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={useMemo(() => ['9%', '50%', '75%'], [])}
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
    </>
  );
}
