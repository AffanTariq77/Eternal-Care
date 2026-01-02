import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialSvg from "../components/ui/social-svg";
import AvatarButton from "../components/ui/avatar-button";
import { Colors } from "../constants/theme";

export default function Home() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const Card = ({
    title,
    desc,
    svg,
    size,
    children,
  }: {
    title: string;
    desc: string;
    svg: any;
    size?: number;
    children?: React.ReactNode;
  }) => (
    <View style={styles.itemCard}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{desc}</Text>
        {children ?? (
          <Pressable style={styles.bookBtn} onPress={() => {}}>
            <Text style={styles.bookBtnText}>Book Now</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.itemImgWrap}>
        <SocialSvg source={svg} size={size ?? 140} />
      </View>
    </View>
  );

  const onLogout = async () => {
    try {
      const { clearToken } = await import('../utils/authStore');
      await clearToken();
    } catch (e) {
      console.warn('Failed to clear token', e);
    }
    setMenuVisible(false);
    (router as any).replace('/Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => setMenuVisible(true)}>
          <Text style={styles.menu}>≡</Text>
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable
            style={styles.iconWrap}
            onPress={() => (router as any).push("/Support")}
          >
            <SocialSvg
              source={require("../assets/images/support.svg")}
              size={22}
            />
          </Pressable>
          <View style={{ marginHorizontal: 6 }}>
            <AvatarButton size={36} />
          </View>
          <View style={styles.iconWrap}>
            <SocialSvg
              source={require("../assets/images/bell.svg")}
              size={20}
            />
          </View>
        </View>
      </View>

      {/* Menu modal */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuBox}>
            <Pressable style={styles.menuItem} onPress={() => { setMenuVisible(false); (router as any).push('/Home'); }}>
              <Text style={styles.menuItemText}>Home</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => { setMenuVisible(false); (router as any).push('/Profile'); }}>
              <Text style={styles.menuItemText}>Profile</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={onLogout}>
              <Text style={[styles.menuItemText, { color: '#d33' }]}>Logout</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchCard}>
          <View style={styles.searchBar}>
            <Text style={styles.searchPlaceholder}>Search graveyard.....</Text>
            <View style={styles.searchIconWrap}>
              <SocialSvg
                source={require("../assets/images/search.svg")}
                size={18}
              />
            </View>
          </View>

          <Card
            title="Respectful Booking"
            desc="Seamless grave booking services with respect and care for your loved ones."
            svg={require("../assets/images/booking.svg")}
            size={140}
          >
            <Pressable
              style={styles.bookBtn}
              onPress={() => (router as any).push("/GraveBooking")}
            >
              <Text style={styles.bookBtnText}>Book Now</Text>
            </Pressable>
          </Card>

          <Card
            title="Spiritual Comfort"
            desc="Providing dignified Quran and Dua recitation services for peace, blessings, and spiritual comfort"
            svg={require("../assets/images/spertual.svg")}
            size={140}
          >
            <Pressable
              style={styles.bookBtn}
              onPress={() => (router as any).push("/QuranRecitation")}
            >
              <Text style={styles.bookBtnText}>Book Now</Text>
            </Pressable>
          </Card>

          <Card
            title="Memorial Care"
            desc="Professional grave cleaning and maintenance with respect and care."
            svg={require("../assets/images/memoreal.svg")}
            size={140}
          >
            <Pressable
              style={styles.bookBtn}
              onPress={() => {
                (router as any).push("/GraveCare");
              }}
            >
              <Text style={styles.bookBtnText}>Book Now</Text>
            </Pressable>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  menu: { fontSize: 24 },
  headerRight: { flexDirection: "row", alignItems: "center" },
  icon: { marginHorizontal: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  profileWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d7efe6",
    marginHorizontal: 6,
  },
  container: { padding: 16 },
  searchCard: {
    backgroundColor: "#164A40",
    borderRadius: 20,
    padding: 16,
  },
  searchBar: {
    backgroundColor: "#f2f2f2",
    borderRadius: 24,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchPlaceholder: { flex: 1, color: "#9aa" },
  searchIcon: { marginLeft: 8 },
  searchIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImgWrap: {
    width: 140,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  itemTitle: { fontWeight: "800", fontSize: 22, marginBottom: 8 },
  itemDesc: {
    color: "#333",
    marginTop: 0,
    flex: 1,
    lineHeight: 22,
  },
  bookBtn: {
    marginTop: 14,
    backgroundColor: "#164A40",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  bookBtnText: { color: "#fff" },
  itemImg: { width: 90, height: 70, marginLeft: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-start' },
  menuBox: { marginTop: 60, marginLeft: 12, width: 160, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 6, elevation: 6, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 14 },
  menuItemText: { fontSize: 16, color: '#111' },
});
