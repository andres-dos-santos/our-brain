import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Link, Stack } from 'expo-router';
import { Text, View, Pressable, SectionList } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { orange } from 'tailwindcss/colors';

import { CreateWeight } from '~/components/create-weight';
import { DietItem } from '~/components/diet-item';
import { supabase } from '~/data/supabase';

const SESSIONS = [
  {
    title: 'Café da manhã • 8am',
    total: '495 kcal',
    index: '1',
    data: [
      '🍳  2 ovos mexidos (140 kcal)',
      '🍞  2 fatias de pão integral (160 kcal)',
      '🥜  1 c/ sopa de pasta de amendoim (90 kcal)',
      '🍌  1 banana (105 kcal)',
    ],
  },
  {
    title: 'Lanche da manhã • 10:30am',
    total: '215 kcal',
    index: '2',
    data: ['🍶  1 iogurte normal (120 kcal)', '🍎  1 maçã (95 kcal)'],
  },
  {
    title: 'Almoço • 1pm',
    total: '~557 kcal',
    index: '3',
    data: [
      '🐔  100g de peito de frango grelhado (165 kcal)',
      '🍚  100g de arroz branco (222 kcal)',
      '🥬  Vegetais variados à vontade (50 kcal)',
      '🍾  1 c/ sopa de azeite de oliva (120 kcal)',
      '🫘  80g de feijão (70 kcal)',
    ],
  },
  {
    title: 'Lanche da tarde • 4pm',
    total: '280 kcal',
    index: '4',
    data: ['🌰  30g de castanhas mistas (180 kcal)', '🍶  1 iogurte normal (120 kcal)'],
  },
  {
    title: 'Jantar • 7:30pm',
    total: '610 kcal',
    index: '5',
    data: [
      '🥩  150g de alcatra moída (300 kcal)',
      '🥔  1 batata-doce média assada (130 kcal)',
      '🥬  Brócolis cozidos no vapor (50 kcal)',
      '🥬  Salada de folhas verdes (30 kcal)',
      '🍾  1 c/ sopa de azeite de oliva (120 kcal)',
    ],
  },
  {
    title: 'Ceia • 10:30pm',
    total: '210 kcal',
    index: '6',
    data: [
      '🧃  1 scoop de whey protein (120 kcal)',
      '🥜  1 c/ sopa de pasta de amendoim (90 kcal)',
    ],
  },
];

interface Data {
  value: number;
  created_at: string;
}

export default function Page() {
  const { data } = useQuery({
    queryKey: ['get-all-weights-query'],
    queryFn: async () => {
      const response = await supabase.from('weight').select('value,created_at');

      return response.data as Data[];
    },
  });

  // const percentage = (last / 70) * 100;

  const hasData = data && data.length > 0;

  const last = hasData ? data[data.length - 1].value : 0;

  return (
    <>
      <Stack.Screen options={{ title: 'Overview' }} />

      <SectionList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        sections={SESSIONS}
        contentContainerStyle={{ paddingHorizontal: 40, paddingTop: 80, paddingBottom: 80 }}
        keyExtractor={(item, index) => item + index}
        renderItem={DietItem}
        renderSectionHeader={({ section: { title, total, index } }) => (
          <View className="flex-row items-center justify-between my-10">
            <View className="flex-row items-center">
              <Text className="font-im text-xs uppercase">{title}</Text>
            </View>
            <Text className="font-usb text-sm">{total}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="items-center justify-center mb-10">
            {/*
              <View className="flex-row items-center justify-between w-full px-10 mb-10">
                <View className="h-14 w-14 rounded-full bg-zinc-100" />
              </View>*/}

            <Text className="font-ir text-sm text-zinc-700 -tracking-wide">
              Your weight •{' '}
              {hasData
                ? `${dayjs(new Date()).diff(dayjs(data[data.length - 1].created_at), 'h')} hours ago`
                : null}
            </Text>

            <View className="flex-row items-center my-10">
              <View>
                <Text className="font-um text-3xl mr-2.5">{last} kg</Text>
                {/**<Text className="font-usb text-sm -tracking-wide absolute text-zinc-500 top-10">
                  {70} kg
                </Text> */}
              </View>

              <Text className="font-um text-3xl">•</Text>

              {/**<FireSVG
                advanced={hasData ? data.length === 1 || last > data[data.length - 2].value : false}
              /> */}

              <Text className="font-um text-3xl ml-2.5">2213 kcal</Text>
            </View>

            <Link asChild href="/shopping-list/">
              <Pressable className="h-10 pl-5 pr-1 mb-10 items-center justify-center bg-zinc-800 flex-row rounded-full">
                <Text className="font-im text-white text-xs -tracking-wide mr-3">
                  SHOPPING LIST
                </Text>

                <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Ionicons name="arrow-forward" />
                </View>
              </Pressable>
            </Link>

            {data && data.length >= 2 ? (
              <View className="h-[50px] ">
                <LineChart
                  data={data}
                  width={350}
                  hideDataPoints1
                  curved
                  hideYAxisText
                  isAnimated
                  color1={orange[500]}
                  hideAxesAndRules
                />
              </View>
            ) : null}

            {/**<TouchableOpacity
              activeOpacity={0.8}
              // onPress={handleInsert}
              className="h-10 pl-5 pr-1 rounded-full items-center justify-center border border-zinc-200 mr-2.5 flex-row mt-10">
              <Text className="font-im text-zinc-900 text-[10px]">SHOPPING LIST</Text>

              <View className="h-8 w-8 items-center justify-center bg-white ml-2.5 rounded-full">
                <Ionicons name="arrow-forward" />
              </View>
            </TouchableOpacity> */}
          </View>
        )}
      />

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

      <CreateWeight />
    </>
  );
}
