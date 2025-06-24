"use client";
import BookIcon from "@mui/icons-material/Book";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MovieIcon from "@mui/icons-material/Movie";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {
  Autocomplete,
  AutocompleteOption,
  Box,
  CircularProgress,
  Typography,
} from "@mui/joy";
import { useCallback, useRef, useState } from "react";

interface WikidataItem {
  id: string;
  label: string;
  description: string;
  url: string;
  image?: string;
}

interface WikidataSearchResponse {
  search: WikidataItem[];
}

const getItemIcon = (item: WikidataItem) => {
  const label = item.label?.toLowerCase() || "";
  const description = item.description?.toLowerCase() || "";

  // People
  if (
    description.includes("human") ||
    description.includes("person") ||
    description.includes("actor") ||
    description.includes("singer") ||
    description.includes("writer") ||
    description.includes("artist") ||
    description.includes("politician") ||
    description.includes("scientist") ||
    description.includes("athlete") ||
    description.includes("musician")
  ) {
    return <PersonIcon sx={{ fontSize: 16 }} />;
  }

  // Places
  if (
    description.includes("city") ||
    description.includes("town") ||
    description.includes("country") ||
    description.includes("state") ||
    description.includes("province") ||
    description.includes("region") ||
    description.includes("village") ||
    description.includes("district") ||
    description.includes("island") ||
    description.includes("mountain") ||
    description.includes("river") ||
    description.includes("lake") ||
    description.includes("ocean") ||
    description.includes("continent")
  ) {
    return <LocationOnIcon sx={{ fontSize: 16 }} />;
  }

  // Events
  if (
    description.includes("event") ||
    description.includes("war") ||
    description.includes("battle") ||
    description.includes("conference") ||
    description.includes("festival") ||
    description.includes("olympics") ||
    description.includes("election") ||
    description.includes("revolution") ||
    description.includes("treaty") ||
    description.includes("discovery")
  ) {
    return <EventIcon sx={{ fontSize: 16 }} />;
  }

  // Organizations/Companies
  if (
    description.includes("company") ||
    description.includes("corporation") ||
    description.includes("organization") ||
    description.includes("institution") ||
    description.includes("foundation") ||
    description.includes("association") ||
    description.includes("agency") ||
    description.includes("ministry") ||
    description.includes("department") ||
    description.includes("committee")
  ) {
    return <BusinessIcon sx={{ fontSize: 16 }} />;
  }

  // Educational institutions
  if (
    description.includes("university") ||
    description.includes("college") ||
    description.includes("school") ||
    description.includes("academy") ||
    description.includes("institute") ||
    description.includes("campus")
  ) {
    return <SchoolIcon sx={{ fontSize: 16 }} />;
  }

  // Scientific/Technical
  if (
    description.includes("scientific") ||
    description.includes("technology") ||
    description.includes("research") ||
    description.includes("laboratory") ||
    description.includes("experiment") ||
    description.includes("theory") ||
    description.includes("discovery") ||
    description.includes("invention") ||
    description.includes("chemical") ||
    description.includes("mathematical")
  ) {
    return <ScienceIcon sx={{ fontSize: 16 }} />;
  }

  // Sports
  if (
    description.includes("sport") ||
    description.includes("game") ||
    description.includes("team") ||
    description.includes("league") ||
    description.includes("tournament") ||
    description.includes("championship") ||
    description.includes("football") ||
    description.includes("basketball") ||
    description.includes("baseball") ||
    description.includes("soccer")
  ) {
    return <SportsEsportsIcon sx={{ fontSize: 16 }} />;
  }

  // Entertainment - Movies/TV
  if (
    description.includes("film") ||
    description.includes("movie") ||
    description.includes("television") ||
    description.includes("tv series") ||
    description.includes("show") ||
    description.includes("drama") ||
    description.includes("comedy") ||
    description.includes("documentary")
  ) {
    return <MovieIcon sx={{ fontSize: 16 }} />;
  }

  // Entertainment - Music
  if (
    description.includes("music") ||
    description.includes("song") ||
    description.includes("album") ||
    description.includes("band") ||
    description.includes("singer") ||
    description.includes("composer") ||
    description.includes("musical") ||
    description.includes("concert")
  ) {
    return <MusicNoteIcon sx={{ fontSize: 16 }} />;
  }

  // Books/Literature
  if (
    description.includes("book") ||
    description.includes("novel") ||
    description.includes("literature") ||
    description.includes("poem") ||
    description.includes("author") ||
    description.includes("publisher") ||
    description.includes("magazine") ||
    description.includes("newspaper")
  ) {
    return <BookIcon sx={{ fontSize: 16 }} />;
  }

  // Default category icon for other items
  return <CategoryIcon sx={{ fontSize: 16 }} />;
};

export const WikidataSearch = ({
  onItemSelect,
}: {
  onItemSelect?: (item: WikidataItem) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<WikidataItem[]>([]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const fetchImageUrl = async (
    entityId: string
  ): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${entityId}&props=claims&format=json&origin=*`
      );

      if (response.ok) {
        const data = await response.json();
        const entity = data.entities[entityId];

        if (entity && entity.claims && entity.claims.P18) {
          // P18 is the property for "image"
          const imageClaim = entity.claims.P18[0];
          if (
            imageClaim &&
            imageClaim.mainsnak &&
            imageClaim.mainsnak.datavalue
          ) {
            const imageFileName = imageClaim.mainsnak.datavalue.value;
            // Convert to Wikimedia Commons URL
            return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
              imageFileName
            )}`;
          }
        }
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    return undefined;
  };

  const searchWikidata = useCallback(
    async (query: string): Promise<WikidataItem[]> => {
      if (query.length < 2) {
        return [];
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
            query
          )}&language=en&format=json&origin=*&limit=10&type=item`
        );

        if (response.ok) {
          const data: WikidataSearchResponse = await response.json();
          return data.search || [];
        }
      } catch (error) {
        console.error("Error searching Wikidata:", error);
      } finally {
        setLoading(false);
      }
      return [];
    },
    []
  );

  const handleItemSelect = async (item: WikidataItem | null) => {
    if (!item) return;

    console.log("Selected item:", item);

    // Fetch image URL
    const imageUrl = await fetchImageUrl(item.id);
    const itemWithImage = { ...item, image: imageUrl };

    onItemSelect?.(itemWithImage);
  };

  const handleInputChange = useCallback(
    async (event: React.SyntheticEvent, value: string) => {
      // Clear any existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set a new timeout for debouncing
      debounceTimeoutRef.current = setTimeout(async () => {
        if (value && value.length >= 2) {
          const results = await searchWikidata(value);
          setOptions(results);
        } else {
          setOptions([]);
        }
      }, 500); // 500ms debounce delay
    },
    [searchWikidata]
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 300, minWidth: 150 }}>
      <Autocomplete<WikidataItem>
        placeholder="Search Wikidata items..."
        startDecorator={<SearchIcon />}
        endDecorator={loading && <CircularProgress size="sm" />}
        size="sm"
        options={options}
        loading={loading}
        onInputChange={handleInputChange}
        onChange={(event, value) => handleItemSelect(value)}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {getItemIcon(option)}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography level="body-xs" fontWeight="lg" noWrap>
                  {option.label}
                </Typography>
                {option.description && (
                  <Typography level="body-xs" color="neutral" noWrap>
                    {option.description}
                  </Typography>
                )}
              </Box>
            </Box>
          </AutocompleteOption>
        )}
        sx={{
          width: "100%",
          "& .MuiAutocomplete-root": {
            backgroundColor: "background.surface",
          },
        }}
      />
    </Box>
  );
};
