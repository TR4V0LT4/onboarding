"use client";

import { useEffect, useState } from 'react';
import Post from './post';
import Loading from '../utils/Loading';
import { Actuality } from '@/types/actualities';
import getSession from '@/lib/getsession';

export default function PostList() {
	const	[data, setData] = useState<Actuality[]>([]);
	const	[loading, setLoading] = useState<boolean>(true);
	const	[page, setPage] = useState<number>(0);

	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight)
			setPage(prev => prev + 1);
	}

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
	
			const	user = await getSession();
			const	responce = await fetch("api/actialities?user=" + user?.id);
			const	json = await responce.json();
	
			setData(json.data);
			setLoading(false);
		}
		fetchData();
	}, []);
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	useEffect(() => {
		async function fetchData() {
			window.removeEventListener("scroll", handleScroll);
			setLoading(true);
	
			const	responce = await fetch("api/actialities?page=" + page);
			const	json = await responce.json();
	
			setData(prev => [...prev, ...json.data]);
			setLoading(false);
			window.addEventListener("scroll", handleScroll);
		}
		if (page > 0)
			fetchData();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [page]);

	return (
		<>
		{
			data.map((d, index) => <Post data={d} key={index}/>)
		}
		{
			loading &&
				<Loading
					stroke="#7D8FB3"
				/>
		}
		</>
	)
}
