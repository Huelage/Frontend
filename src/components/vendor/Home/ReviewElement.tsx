import { StarRating } from '@components/misc';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { ReviewInterface } from '@interfaces';
import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ReviewElement = ({ name, avatar, rating, date, message }: ReviewInterface) => {
	const { color } = useAppTheme();
	const colors = ['#92828D', '#95BF74', '#2A1A1F', '#F1A208', '#FE7F2D'];
	const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
	return (
		<View style={styles.container} testID='review element'>
			<View style={styles.header}>
				<View style={styles.userBox}>
					<View style={[styles.avatarBox, { backgroundColor }]}>
						<Text testID='backup avatar' style={styles.avatarText}>{name[0].toUpperCase()}</Text>
						{avatar && (
							<Image testID='reviewer image' style={styles.avatar} source={{ uri: avatar }} />
						)}
					</View>
					<Text style={[styles.userName, { color: color.mainText }]}>{name}</Text>
				</View>
				<MaterialCommunityIcons name="dots-vertical" size={24} color={color.mainText} />
			</View>
			<View style={styles.ratingBox}>
				<View><StarRating color={color.mainGreen} gap={5} rating={rating} /></View>
				<Text style={[styles.date, { color: color.mainText }]}>{date}</Text>
			</View>
			<Text style={[styles.message, { color: color.mainText }]}>{message}</Text>
		</View>
	);
};

export default ReviewElement;

const styles = StyleSheet.create({
	container: {
		gap: 10
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 30,
		justifyContent: 'space-between'
	},
	userBox: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center'
	},
	avatarBox: {
		alignItems: 'center',
		borderRadius: 20,
		height: 35,
		justifyContent: 'center',
		width: 35
	},
	avatar: {
		borderRadius: 20,
		height: 35,
		position: 'absolute',
		width: 35
	},
	avatarText: {
		color: 'white',
		fontFamily: fonts.I_700,
		fontSize: 16
	},
	userName: {
		fontFamily: fonts.I_500,
		fontSize: 15
	},
	ratingBox: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 20
	},
	date: {
		fontFamily: fonts.I_300,
		fontSize: 12
	},
	message: {
		fontFamily: fonts.I_500,
		fontSize: 14
	}
});