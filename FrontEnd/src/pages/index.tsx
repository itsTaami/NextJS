import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Pagination from "../component/pagination";
import NavBar from "@/component/navbar";

const inter = Inter({ subsets: ["latin"] });
interface IAwards {
  wins: number;
  nominations: number;
  text: String;
}
interface IMovie {
  _id: string;
  title: String;
  genre: [String];
  runtime: number;
  cast: [String];
  poster: String;
  plot: String;
  languages: [String];
  released: Date;
  directors: [String];
  rated: String;
  awards: IAwards;
  lastupdated: Date;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: [String];
  tomatoes: {
    viewer: { rating: number; numRevies: number; meter: number };
    fresh: number;
  };
  critic: { rating: number; numViewer: number; meter: number };
  rotten: number;
  lastUpdated: Date;
}

interface IMovies {
  movies: IMovie[];
  pagination: any;
}

export default function Home({ movies, pagination }: IMovies) {
  const router = useRouter();
  const pages = [1, 2, 3, 4, 5, 6];
  const [cur, setCur] = useState<number>(1);
  const handlePagination = (action: string) => {
    if (action === "next") {
      router.replace(`?limit=4&page=${pagination.page + 1}`);
    } else {
      router.replace(`?limit=4&page=${pagination.page - 1}`);
    }
  };
  // const [movies, setMovies] = useState<IMovie[]>([]);

  // const getMovies = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8005/movies");
  //     const data = res.json();
  //   } catch (error) {}
  // };
  // useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar movies={movies} />

      <div className="bg-violet-900  ">
        <h1 className="text-white container mx-auto font-bold text-center text-9xl pt-28">
          Welcome Movie Review List
        </h1>
        <div className=" mt-40 container mx-auto grid grid-cols-2 w-full ">
          {/* <div className="grid grid-cols-4 ">
            {movies.map((movie, idx) => (
              <div key={idx} className="m-5">
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:bg-gray-300  h-full flex flex-col w-full">
                  <Image
                    src={movie.poster || "/PussInBoots.jpg"}
                    alt="moviePhoto"
                    width={600}
                    height={800}
                    className="h-3/5 "
                  />
                  <div className="px-6 pt-4 pb-2 flex justify-between ">
                    <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-xl font-semibold  mr-2 mb-2 text-white">
                      🍅 {movie.tomatoes.viewer.meter || "00"}?
                    </span>
                    <span className="inline-block bg-yellow-400 rounded-full px-3 py-1 text-2xl font-semibold mr-2 mb-2 text-white">
                      🍿 {movie.imdb.rating}?
                    </span>
                  </div>
                  <div className="px-6 py-4 h-3/6 flex flex-col ">
                    <div className="font-bold text-xl truncate ">
                      {movie.title}
                    </div>
                    <p className="text-gray-700 text-base text-left pt-12 ">
                      {movie.plot}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          {movies.length > 0 &&
            movies.map((movie: IMovie, idx) => (
              <div key={idx} className="p-2 ">
                <div className="h-3/4 w-full flex bg-slate-500 rounded-2xl hover:bg-slate-400 ">
                  <div className="w-2/5 ">
                    <Image
                      src={movie.poster || "/PussInBoots.jpg"}
                      alt="moviePhoto"
                      width={300}
                      height={400}
                      className="h-full w-full rounded-l-2xl "
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between w-3/5 ">
                    <div className="text-white font-bold text-2xl mb-2">
                      {movie.title}
                    </div>
                    <p className="text-white text-base">{movie.plot}</p>

                    <p>
                      <Link
                        className="text-orange-400"
                        href={`movies/${movie._id}`}
                      >
                        Read More...
                      </Link>
                    </p>

                    <div className="text-sm flex justify-between">
                      <p className="  leading-none text-white text-3xl  w-2/6  self-center text-center ">
                        🍅 {movie.tomatoes.viewer.meter || "00"}%
                      </p>
                      <p className="text-white leading-none text-3xl w-2/6 self-center text-center  ">
                        🍿 {movie.imdb.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center my-10">
          <Pagination
            pages={pages}
            cur={pagination.page}
            nextPage={() => {
              handlePagination("next");
            }}
            prevPage={() => {
              handlePagination("prev");
            }}
          />
        </div>
        {/* <div>
          <Link className="text-white" href="/about">
            About
          </Link>
        </div> */}
        {/* <div>
          <Link className="text-white" href="/movie">
            Movie
          </Link>
        </div> */}
        {/* <div className="mt-10">
          {movies.map((movie, idx) => (
            <div key={idx}>{movie.title}</div>
          ))}
        </div> */}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const { page, limit } = ctx.query;
  const res = await fetch(
    `http://localhost:8005/movies?limit=${limit || 4}&page=${page || 1}`
  );
  const data = await res.json();
  console.log("============>", data);

  return {
    props: { movies: data.movies, pagination: data.pagination },
  };
}
