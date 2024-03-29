import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { zinc } from 'tailwindcss/colors';

const KEYBOARD_DATA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'back'];

export default function Page() {
  const [changed, setChanged] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);

  const data = [
    { value: 50 },
    { value: 52 },
    { value: 43 },
    { value: 56 },
    { value: 57 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Overview' }} />

      <View className="flex-1 items-center pt-14">
        <Text className="font-ir text-sm text-zinc-700 -tracking-wide">Your weight</Text>
        <View className="flex-row items-center w-[80%] justify-between my-10 px-10">
          <Text className="font-um text-3xl">76,9 kg</Text>
          <Text className="font-um text-3xl">2.5 kcal</Text>
        </View>

        <View className="flex-row items-center max-w-[80%]">
          <View className="h-1 rounded-full mb-10 w-[40%] bg-zinc-700" />
          <View className="h-1 rounded-full mb-10 w-[60%] bg-zinc-200" />
        </View>

        <View className="p-10 items-center justify-center">
          <Text className="font-ir text-sm text-zinc-700 -tracking-wide mb-5">
            Your weight over time
          </Text>

          <LineChart
            data={data}
            hideDataPoints1
            curved
            hideYAxisText
            isAnimated
            color1={zinc[700]}
            hideAxesAndRules
          />
        </View>
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
                  onPress={() => bottomSheetRef.current?.collapse()}
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
